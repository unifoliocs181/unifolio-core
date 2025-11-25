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
import { useEffect, useState, Suspense } from 'react'
import { Github, Linkedin, X } from 'lucide-react'

function LoginContent() {
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
                <Github className="w-5 h-5" />
                Login with GitHub
              </button>

              <button
                type="button"
                onClick={handleLinkedInLogin}
                className="w-full flex items-center justify-center gap-2 border border-unifolio-border bg-unifolio-white text-unifolio-dark py-2 rounded-lg font-semibold hover:bg-unifolio-lightgray transition-colors"
              >
                <Linkedin className="w-5 h-5" />
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
                <X className="w-6 h-6" />
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

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><p>Loading...</p></div></div>}>
      <LoginContent />
    </Suspense>
  )
}
