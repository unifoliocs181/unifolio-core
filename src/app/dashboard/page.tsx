'use client'
import LoginHeader from '../../components/login/LoginHeader'
import LoginFooter from '../../components/login/LoginFooter'
import { useRouter } from 'next/navigation'
import { auth, getUserFromDatabase, UserData } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loadingUserData, setLoadingUserData] = useState(true)

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
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoadingUserData(false)
        }
      }
    }

    fetchUserData()
  }, [user])

  if (loading || loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-unifolio-lightgray">
        <p className="text-unifolio-mediumgray">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-unifolio-lightgray">
      <LoginHeader />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-2xl bg-unifolio-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-unifolio-dark mb-2">
            Welcome back, {userData?.fullName || 'User'}!
          </h2>
          <p className="text-unifolio-mediumgray mb-6">
            You are signed in as: <strong>{user.email}</strong>
          </p>
          <div className="mt-6 p-4 bg-unifolio-lightgray rounded-lg">
            <h3 className="text-lg font-semibold text-unifolio-dark mb-3">
              Your Profile Information
            </h3>
            <div className="space-y-2 text-unifolio-dark">
              <p>
                <strong>Full Name:</strong> {userData?.fullName || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {userData?.email || user.email}
              </p>
              <p>
                <strong>User ID:</strong> {userData?.uid || user.uid}
              </p>
              <p>
                <strong>Sign-in Method:</strong>{' '}
                {userData?.signInMethod || 'N/A'}
              </p>
              <p>
                <strong>Account Created:</strong>{' '}
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Last Sign In:</strong>{' '}
                {userData?.lastSignIn
                  ? new Date(userData.lastSignIn).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              auth.signOut()
              router.push('/login')
            }}
            className="mt-6 bg-unifolio-dark text-unifolio-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Sign Out
          </button>
        </div>
      </div>
      <LoginFooter />
    </div>
  )
}
