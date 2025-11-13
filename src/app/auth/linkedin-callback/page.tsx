'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { auth, saveUserToDatabase } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'

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
                const linkedInPassword = `LI_${profile.sub}_UNIFIED_PASSWORD`
                let userCredential

                try {
                    userCredential = await createUserWithEmailAndPassword(auth, profile.email, linkedInPassword)
                    await updateProfile(userCredential.user, {
                        displayName: profile.fullName || profile.name,
                        photoURL: profile.picture || null,
                    })
                } catch (createError: unknown) {
                    if (createError instanceof Error && createError.message.includes('email-already-in-use')) {
                        try {
                            userCredential = await signInWithEmailAndPassword(auth, profile.email, linkedInPassword)
                        } catch (signInError) {
                            console.error('Sign in error:', signInError)
                            router.push('/login?error=email_used_different_method')
                            return
                        }
                    } else {
                        throw createError
                    }
                }

                if (!userCredential) {
                    throw new Error('Failed to authenticate user')
                }

                await saveUserToDatabase({
                    uid: userCredential.user.uid,
                    email: profile.email,
                    fullName: profile.fullName || profile.name,
                    signInMethod: 'linkedin',
                    agreeToTerms: true,
                    createdAt: new Date().toISOString(),
                    lastSignIn: new Date().toISOString(),
                })

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
