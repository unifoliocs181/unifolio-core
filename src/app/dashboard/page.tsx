'use client'
import LoginHeader from '../../components/login/LoginHeader'
import LoginFooter from '../../components/login/LoginFooter'
import { useRouter } from 'next/navigation'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
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
            Welcome to your Dashboard
          </h2>
          <p className="text-unifolio-mediumgray mb-6">
            You are signed in as: <strong>{user.email}</strong>
          </p>
          <div className="mt-6 p-4 bg-unifolio-lightgray rounded-lg">
            <p className="text-unifolio-dark">
              Your dashboard content will appear here.
            </p>
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
