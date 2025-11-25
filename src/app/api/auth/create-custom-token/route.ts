import { NextRequest, NextResponse } from 'next/server'
import admin from 'firebase-admin'

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey ? privateKey.replace(/\\n/g, '\n') : undefined,
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  } catch (error) {
    console.error('Firebase admin initialization error', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, displayName, providerId } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    let user
    try {
      // Check if user already exists
      user = await admin.auth().getUserByEmail(email)
    } catch (error) {
      // User doesn't exist, create a new one
      user = await admin.auth().createUser({
        email,
        displayName,
        emailVerified: true,
      })
    }

    // Update provider data if needed
    const existingProviders = user.providerData.map((p) => p.providerId)
    if (!existingProviders.includes(providerId)) {
      // Note: We can't directly add providers via Admin SDK
      // The linking will happen on the client side
      console.log(`User ${email} will link ${providerId} provider`)
    }

    // Generate custom token
    const customToken = await admin.auth().createCustomToken(user.uid)

    return NextResponse.json({
      customToken,
      uid: user.uid,
      email: user.email,
    })
  } catch (error) {
    console.error('Error creating custom token:', error)
    return NextResponse.json(
      { error: 'Failed to create custom token' },
      { status: 500 }
    )
  }
}
