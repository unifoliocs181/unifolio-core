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
    const { email, password, fullName } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    let user
    try {
      // Check if user already exists
      user = await admin.auth().getUserByEmail(email)

      // User exists, update with password
      await admin.auth().updateUser(user.uid, {
        password: password,
        displayName: fullName || user.displayName,
      })

      console.log(`Password added to existing account for ${email}`)
    } catch (error) {
      // User doesn't exist, create a new one with email/password
      user = await admin.auth().createUser({
        email,
        password,
        displayName: fullName,
        emailVerified: false,
      })

      console.log(`New account created for ${email}`)
    }

    // Generate custom token for authentication
    const customToken = await admin.auth().createCustomToken(user.uid)

    return NextResponse.json({
      customToken,
      uid: user.uid,
      email: user.email,
      isNewUser:
        !user.metadata?.creationTime ||
        new Date(user.metadata.creationTime).getTime() === new Date().getTime(),
    })
  } catch (error) {
    console.error('Error linking email/password:', error)
    return NextResponse.json(
      { error: 'Failed to create or link account' },
      { status: 500 }
    )
  }
}
