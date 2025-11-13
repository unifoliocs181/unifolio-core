'use client'

import React, { useState } from 'react'
import SignUpHeader from '../../components/signup/SignUpHeader'
import SignUpFooter from '../../components/signup/SignUpFooter'
import { useRouter } from 'next/navigation'
import { auth, saveUserToDatabase, githubProvider } from '../firebase'
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth'
import { signInWithPopup } from 'firebase/auth'

const SignUp = () => {
  const router = useRouter()
  const [createUser] = useCreateUserWithEmailAndPassword(auth)
  const [sendEmailVerification] = useSendEmailVerification(auth)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })

  const handleGitHubSignUp = async () => {
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

      await saveUserToDatabase({
        uid: user.uid,
        email: user.email || '',
        fullName: fullName,
        signInMethod: 'github',
        agreeToTerms: true,
        createdAt: new Date().toISOString(),
        lastSignIn: new Date().toISOString(),
      })

      router.push('/dashboard')
    } catch (error: unknown) {
      console.error('GitHub signup error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign up with GitHub'
      alert(`Error: ${errorMessage}`)
    }
  }

  const handleLinkedInSignUp = () => {
    window.location.href = '/api/auth/linkedin'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    try {
      const result = await createUser(formData.email, formData.password)
      if (result?.user) {
        // Save user data to Firestore
        await saveUserToDatabase({
          uid: result.user.uid,
          email: result.user.email || formData.email,
          fullName: formData.fullName,
          signInMethod: 'email',
          agreeToTerms: formData.agreeToTerms,
          createdAt: new Date().toISOString(),
          lastSignIn: new Date().toISOString(),
        })

        await sendEmailVerification()
        alert(
          'Account created successfully! Please check your email to verify your account.'
        )
        router.push('/login')
      } else {
        alert('Failed to create account. Please try again.')
      }
    } catch (error: unknown) {
      console.error('Sign up error:', error)
      let errorMessage = 'Failed to create account. Please try again.'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        errorMessage = (error as { message?: string }).message || errorMessage
      }
      alert(`Error: ${errorMessage}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-unifolio-lightgray">
      <SignUpHeader />

      {/* Sign Up Form Section */}
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="signup-form-container w-full max-w-md bg-unifolio-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-unifolio-dark mb-2">
            Create Account
          </h2>
          <p className="text-unifolio-mediumgray mb-8">
            Join unifolio and start building your portfolio today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="signup-form-input">
              <label className="block text-unifolio-dark font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray transition-all"
              />
            </div>

            <div className="signup-form-input">
              <label className="block text-unifolio-dark font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray transition-all"
              />
            </div>

            <div className="signup-form-input">
              <label className="block text-unifolio-dark font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray transition-all"
              />
            </div>

            <div className="signup-form-input">
              <label className="block text-unifolio-dark font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray transition-all"
              />
            </div>

            <div className="signup-form-input flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="mt-1 rounded"
              />
              <label className="text-unifolio-mediumgray text-sm">
                I agree to the{' '}
                <a
                  href="#"
                  className="text-unifolio-dark font-semibold hover:underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="text-unifolio-dark font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="signup-submit-btn w-full bg-unifolio-dark text-unifolio-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-6"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-unifolio-border"></div>
            <span className="text-unifolio-mediumgray text-sm">or</span>
            <div className="flex-1 h-px bg-unifolio-border"></div>
          </div>

          <button
            type="button"
            onClick={handleGitHubSignUp}
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
            Sign up with GitHub
          </button>

          <button
            type="button"
            onClick={handleLinkedInSignUp}
            className="w-full flex items-center justify-center gap-2 border border-unifolio-border bg-unifolio-white text-unifolio-dark py-2 rounded-lg font-semibold hover:bg-unifolio-lightgray transition-colors mt-3"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.337 0H3.663C1.641 0 0 1.6 0 3.578v12.844C0 18.4 1.641 20 3.663 20h12.674C18.359 20 20 18.4 20 16.422V3.578C20 1.6 18.359 0 16.337 0zM5.957 16.917H2.97V7.543h2.987v9.374zM4.464 6.217c-.957 0-1.73-.77-1.73-1.72 0-.95.773-1.72 1.73-1.72.956 0 1.73.77 1.73 1.72 0 .95-.774 1.72-1.73 1.72zm12.453 10.7h-2.987v-4.552c0-1.084-.387-1.823-1.357-1.823-.74 0-1.18.497-1.374 978-.07.002-.07.013-.07.024v5.351H7.72V7.543h2.87v1.279c.398-.613 1.11-1.484 2.7-1.484 1.973 0 3.454 1.288 3.454 4.058v5.521z"></path>
            </svg>
            Sign up with LinkedIn
          </button>

          <p className="text-center text-unifolio-mediumgray mt-6">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-unifolio-dark font-semibold hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>

      <SignUpFooter />
    </div>
  )
}

export default SignUp
