'use client'
import LoginHeader from '../../components/login/LoginHeader'
import LoginFooter from '../../components/login/LoginFooter'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  auth,
  saveUserToDatabase,
  getUserFromDatabase,
  githubProvider,
} from '../firebase'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'
import { useEffect, useState } from 'react'

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [isResetting, setIsResetting] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false)

  useEffect(() => {
    const autoLogin = async () => {
      const savedEmail = localStorage.getItem('rememberedEmail')
      const savedPassword = localStorage.getItem('rememberedPassword')
      const wasRemembered = localStorage.getItem('rememberMe') === 'true'

      if (wasRemembered && savedEmail && savedPassword) {
        setIsAutoLoggingIn(true)
        try {
          const result = await signInWithEmailAndPassword(
            savedEmail,
            savedPassword
          )
          if (result?.user) {
            const existingUserData = await getUserFromDatabase(result.user.uid)
            if (existingUserData) {
              await saveUserToDatabase({
                ...existingUserData,
                lastSignIn: new Date().toISOString(),
              })
            }
            router.push('/dashboard')
          }
        } catch (error) {
          console.error('Auto-login failed:', error)
          setEmail(savedEmail)
          setPassword(savedPassword)
          setRememberMe(true)
          setIsAutoLoggingIn(false)
        }
      } else if (wasRemembered && savedEmail) {
        setEmail(savedEmail)
        setPassword(savedPassword || '')
        setRememberMe(true)
      }
    }

    autoLogin()
  }, [signInWithEmailAndPassword, router])

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'linkedin_not_configured') {
      alert(
        'LinkedIn login is not configured. Please add your LinkedIn credentials to .env.local file. See LINKEDIN_SETUP.md for instructions.'
      )
    }
  }, [searchParams])

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const user = result.user

      let fullName = user.displayName || ''

      if (!fullName && user.providerData && user.providerData[0]) {
        fullName = user.providerData[0].displayName || ''
      }

      if (!fullName) {
        fullName = user.email?.split('@')[0] || 'GitHub User'
      }

      const existingUserData = await getUserFromDatabase(user.uid)

      if (existingUserData) {
        await saveUserToDatabase({
          ...existingUserData,
          signInMethod: existingUserData.signInMethod.includes('github')
            ? existingUserData.signInMethod
            : `${existingUserData.signInMethod},github`,
          lastSignIn: new Date().toISOString(),
        })
      } else {
        await saveUserToDatabase({
          uid: user.uid,
          email: user.email || '',
          fullName: fullName,
          signInMethod: 'github',
          agreeToTerms: true,
          createdAt: new Date().toISOString(),
          lastSignIn: new Date().toISOString(),
        })
      }

      if (rememberMe) {
        localStorage.setItem('lastLoginMethod', 'github')
        localStorage.setItem('rememberMe', 'true')
      }

      router.push('/dashboard')
    } catch (error: unknown) {
      console.error('GitHub login error:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to login with GitHub'
      alert(`Error: ${errorMessage}`)
    }
  }

  const handleLinkedInLogin = () => {
    if (rememberMe) {
      localStorage.setItem('lastLoginMethod', 'linkedin')
      localStorage.setItem('rememberMe', 'true')
    }
    window.location.href = '/api/auth/linkedin'
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resetEmail) {
      alert('Please enter your email address')
      return
    }

    setIsResetting(true)
    try {
      await sendPasswordResetEmail(auth, resetEmail)
      alert('Password reset email sent! Please check your inbox.')
      setShowForgotPassword(false)
      setResetEmail('')
    } catch (error: unknown) {
      console.error('Password reset error:', error)
      if (error instanceof Error) {
        if (error.message.includes('user-not-found')) {
          alert('No account found with this email address.')
        } else if (error.message.includes('invalid-email')) {
          alert('Please enter a valid email address.')
        } else {
          alert(`Error: ${error.message}`)
        }
      } else {
        alert('Failed to send password reset email. Please try again.')
      }
    } finally {
      setIsResetting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await signInWithEmailAndPassword(email, password)
      if (result?.user) {
        const existingUserData = await getUserFromDatabase(result.user.uid)
        if (existingUserData) {
          await saveUserToDatabase({
            ...existingUserData,
            lastSignIn: new Date().toISOString(),
          })
        }

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email)
          localStorage.setItem('rememberedPassword', password)
          localStorage.setItem('lastLoginMethod', 'email')
          localStorage.setItem('rememberMe', 'true')
        } else {
          localStorage.removeItem('rememberedEmail')
          localStorage.removeItem('rememberedPassword')
          localStorage.removeItem('lastLoginMethod')
          localStorage.removeItem('rememberMe')
        }

        router.push('/dashboard')
      } else {
        alert('Failed to sign in. Please check your credentials.')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Sign in error:', error)
        alert(`Error: ${error.message}`)
      } else {
        console.error('Sign in error:', error)
        alert('Error: Failed to sign in')
      }
    }
  }

  return (
    <div className="min-h-screen bg-unifolio-lightgray">
      <LoginHeader />
      {isAutoLoggingIn ? (
        <div className="flex items-center justify-center py-16 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unifolio-dark mx-auto mb-4"></div>
            <p className="text-unifolio-mediumgray">
              Signing you in automatically...
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md bg-unifolio-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-unifolio-dark mb-2">
              Welcome Back
            </h2>
            <p className="text-unifolio-mediumgray mb-6">
              Sign in to your account to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-unifolio-dark font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray"
                />
              </div>

              <div>
                <label className="block text-unifolio-dark font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-unifolio-mediumgray">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-unifolio-gray hover:text-unifolio-dark"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-unifolio-dark text-unifolio-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-6"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-unifolio-border"></div>
              <span className="text-unifolio-mediumgray text-sm">or</span>
              <div className="flex-1 h-px bg-unifolio-border"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGitHubLogin}
                className="w-full flex items-center justify-center gap-2 border border-unifolio-border bg-unifolio-white text-unifolio-dark py-2 rounded-lg font-semibold hover:bg-unifolio-lightgray transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.19.092-.926.35-1.557.636-1.914-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.19 20 14.434 20 10.017 20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Login with GitHub
              </button>

              <button
                type="button"
                onClick={handleLinkedInLogin}
                className="w-full flex items-center justify-center gap-2 border border-unifolio-border bg-unifolio-white text-unifolio-dark py-2 rounded-lg font-semibold hover:bg-unifolio-lightgray transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.337 0H3.663C1.641 0 0 1.6 0 3.578v12.844C0 18.4 1.641 20 3.663 20h12.674C18.359 20 20 18.4 20 16.422V3.578C20 1.6 18.359 0 16.337 0zM5.957 16.917H2.97V7.543h2.987v9.374zM4.464 6.217c-.957 0-1.73-.77-1.73-1.72 0-.95.773-1.72 1.73-1.72.956 0 1.73.77 1.73 1.72 0 .95-.774 1.72-1.73 1.72zm12.453 10.7h-2.987v-4.552c0-1.084-.387-1.823-1.357-1.823-.74 0-1.18.497-1.374 978-.07.002-.07.013-.07.024v5.351H7.72V7.543h2.87v1.279c.398-.613 1.11-1.484 2.7-1.484 1.973 0 3.454 1.288 3.454 4.058v5.521z"></path>
                </svg>
                Login with LinkedIn
              </button>
            </div>

            <p className="text-center text-unifolio-mediumgray mt-6">
              Dont have an account?{' '}
              <a
                href="/signup"
                className="text-unifolio-dark font-semibold hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      )}
      <LoginFooter />

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-unifolio-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-unifolio-dark">
                Reset Password
              </h3>
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetEmail('')
                }}
                className="text-unifolio-mediumgray hover:text-unifolio-dark"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-unifolio-mediumgray mb-4">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-unifolio-dark font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false)
                    setResetEmail('')
                  }}
                  className="flex-1 px-4 py-2 border border-unifolio-border text-unifolio-dark rounded-lg font-semibold hover:bg-unifolio-lightgray transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResetting}
                  className="flex-1 px-4 py-2 bg-unifolio-dark text-unifolio-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isResetting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
