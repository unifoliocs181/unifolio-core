'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, getUserFromDatabase, saveUserToDatabase, deleteUserFromDatabase } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser,
    unlink
} from 'firebase/auth'
import DashboardHeader from '../../../components/DashboardHeader'
import DashboardFooter from '../../../components/DashboardFooter'

export default function UserSettings() {
    const router = useRouter()
    const [user, loading] = useAuthState(auth)
    const [userData, setUserData] = useState<any>(null)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showRemoveMethodConfirm, setShowRemoveMethodConfirm] = useState(false)
    const [methodToRemove, setMethodToRemove] = useState('')
    const [signInMethods, setSignInMethods] = useState<string[]>([])
    const [hasEmailPassword, setHasEmailPassword] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const data = await getUserFromDatabase(user.uid)
                    setUserData(data)

                    if (data?.signInMethod) {
                        const methods = data.signInMethod.split(',').map((m: string) => m.trim())
                        setSignInMethods(methods)
                        setHasEmailPassword(methods.includes('email'))
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            }
        }

        fetchUserData()
    }, [user])

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match')
            return
        }

        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long')
            return
        }

        try {
            if (!user?.email) {
                alert('No email found for this account')
                return
            }

            const credential = EmailAuthProvider.credential(user.email, currentPassword)
            await reauthenticateWithCredential(user, credential)
            await updatePassword(user, newPassword)

            alert('Password changed successfully!')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setShowChangePassword(false)
        } catch (error: any) {
            console.error('Error changing password:', error)
            if (error.code === 'auth/wrong-password') {
                alert('Current password is incorrect')
            } else {
                alert(`Error: ${error.message}`)
            }
        }
    }

    const handleDeleteAccount = async () => {
        try {
            if (!user) return

            const uid = user.uid

            await deleteUserFromDatabase(uid)
            await deleteUser(user)

            localStorage.removeItem('rememberedEmail')
            localStorage.removeItem('rememberedPassword')
            localStorage.removeItem('lastLoginMethod')
            localStorage.removeItem('rememberMe')

            alert('Account deleted successfully')
            router.push('/login')
        } catch (error: any) {
            console.error('Error deleting account:', error)
            alert(`Error deleting account: ${error.message}. You may need to re-authenticate first.`)
        }
    }

    const handleRemoveSignInMethod = async () => {
        try {
            if (!user || !userData) return

            const methods = signInMethods.filter(m => m !== methodToRemove)

            if (methods.length === 0) {
                alert('Cannot remove last sign-in method. Please add another method first.')
                return
            }

            let providerToUnlink = ''
            if (methodToRemove === 'github') {
                providerToUnlink = 'github.com'
            } else if (methodToRemove === 'email') {
                providerToUnlink = 'password'
            }

            if (providerToUnlink) {
                try {
                    await unlink(user, providerToUnlink)
                } catch (unlinkError) {
                    console.log('Provider unlink not needed or failed:', unlinkError)
                }
            }

            await saveUserToDatabase({
                ...userData,
                signInMethod: methods.join(','),
                lastSignIn: new Date().toISOString(),
            })

            setSignInMethods(methods)
            setShowRemoveMethodConfirm(false)
            setMethodToRemove('')
            alert('Sign-in method securely deleted')
        } catch (error: any) {
            console.error('Error removing sign-in method:', error)
            alert(`Error: ${error.message}`)
        }
    }

    const getMethodIcon = (method: string) => {
        switch (method) {
            case 'email':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                )
            case 'github':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.19.092-.926.35-1.557.636-1.914-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.19 20 14.434 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                )
            case 'linkedin':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.337 0H3.663C1.641 0 0 1.6 0 3.578v12.844C0 18.4 1.641 20 3.663 20h12.674C18.359 20 20 18.4 20 16.422V3.578C20 1.6 18.359 0 16.337 0zM5.957 16.917H2.97V7.543h2.987v9.374zM4.464 6.217c-.957 0-1.73-.77-1.73-1.72 0-.95.773-1.72 1.73-1.72.956 0 1.73.77 1.73 1.72 0 .95-.774 1.72-1.73 1.72zm12.453 10.7h-2.987v-4.552c0-1.084-.387-1.823-1.357-1.823-.74 0-1.18.497-1.374.978-.07.002-.07.013-.07.024v5.351H7.72V7.543h2.87v1.279c.398-.613 1.11-1.484 2.7-1.484 1.973 0 3.454 1.288 3.454 4.058v5.521z" />
                    </svg>
                )
            default:
                return null
        }
    }

    const getMethodName = (method: string) => {
        switch (method) {
            case 'email':
                return 'Email & Password'
            case 'github':
                return 'GitHub'
            case 'linkedin':
                return 'LinkedIn'
            default:
                return method
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <p className="text-gray-400">Loading...</p>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <DashboardHeader user={user} userName={userData?.fullName} />

            <main className="grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

                {hasEmailPassword && (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 mb-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Change Password</h2>

                        {!showChangePassword ? (
                            <button
                                onClick={() => setShowChangePassword(true)}
                                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-950 transition-colors border border-gray-600"
                            >
                                Change Password
                            </button>
                        ) : (
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Save Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowChangePassword(false)
                                            setCurrentPassword('')
                                            setNewPassword('')
                                            setConfirmPassword('')
                                        }}
                                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {signInMethods.length >= 2 && (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 mb-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Sign-In Methods</h2>
                        <p className="text-gray-400 text-sm mb-4">
                            You have multiple sign-in methods. You can remove any method except the last one.
                        </p>

                        <div className="space-y-3">
                            {signInMethods.map((method) => (
                                <div
                                    key={method}
                                    className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-gray-400">
                                            {getMethodIcon(method)}
                                        </div>
                                        <span className="text-white font-medium">
                                            {getMethodName(method)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setMethodToRemove(method)
                                            setShowRemoveMethodConfirm(true)
                                        }}
                                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-red-900">
                    <h2 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h2>
                    <p className="text-gray-400 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </main>

            <DashboardFooter />

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-md w-full">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/30 mb-4">
                                <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Delete Account?</h3>
                            <p className="text-gray-400 mb-6">
                                This action cannot be undone. All your data will be permanently deleted.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showRemoveMethodConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-md w-full">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-900/30 mb-4">
                                <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Remove Sign-In Method?</h3>
                            <p className="text-gray-400 mb-6">
                                Are you sure you want to remove <strong>{getMethodName(methodToRemove)}</strong> from your account?
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleRemoveSignInMethod}
                                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                                >
                                    Yes, Remove
                                </button>
                                <button
                                    onClick={() => {
                                        setShowRemoveMethodConfirm(false)
                                        setMethodToRemove('')
                                    }}
                                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
