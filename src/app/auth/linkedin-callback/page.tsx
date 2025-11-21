'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { auth, saveUserToDatabase, getUserFromDatabase } from '../../firebase'
import { signInWithCustomToken, updateProfile } from 'firebase/auth'

export default function LinkedInCallback() {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleLinkedInAuth = async () => {
            try {
                const data = searchParams.get('data')
                if (!data) {
                    router.push('/login?error=no_linkedin_data')
                    return
                }

                const profile = JSON.parse(decodeURIComponent(data))
                
                if (!profile.customToken) {
                    router.push('/login?error=missing_custom_token')
                    return
                }
                
                // Sign in with custom token (this will use existing account if email matches)
                const userCredential = await signInWithCustomToken(auth, profile.customToken)
                const user = userCredential.user

                // Update profile with LinkedIn data
                await updateProfile(user, {
                    displayName: profile.fullName || profile.name,
                    photoURL: profile.picture || null,
                })

                // Check if user data already exists (might be from GitHub login)
                const existingUserData = await getUserFromDatabase(user.uid)
                
                if (existingUserData) {
                    // Update existing user with LinkedIn sign-in method and last sign-in time
                    await saveUserToDatabase({
                        ...existingUserData,
                        signInMethod: existingUserData.signInMethod.includes('linkedin') 
                            ? existingUserData.signInMethod 
                            : `${existingUserData.signInMethod},linkedin`,
                        lastSignIn: new Date().toISOString(),
                    })
                } else {
                    // Create new user entry
                    await saveUserToDatabase({
                        uid: user.uid,
                        email: profile.email,
                        fullName: profile.fullName || profile.name,
                        signInMethod: 'linkedin',
                        agreeToTerms: true,
                        createdAt: new Date().toISOString(),
                        lastSignIn: new Date().toISOString(),
                    })
                }

                router.push('/dashboard')
            } catch (error) {
                console.error('Error processing LinkedIn auth:', error)
                router.push('/login?error=linkedin_processing_failed')
            }
        }

        handleLinkedInAuth()
    }, [router, searchParams])

    return (
        <div className="min-h-screen flex items-center justify-center bg-unifolio-lightgray">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unifolio-dark mx-auto mb-4"></div>
                <p className="text-unifolio-mediumgray">Completing LinkedIn sign-in...</p>
            </div>
        </div>
    )
}
