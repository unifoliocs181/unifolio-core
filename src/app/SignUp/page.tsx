'use client'

import React, { useState } from 'react'
import SignUpHeader from '../../components/signup/SignUpHeader'
import SignUpFooter from '../../components/signup/SignUpFooter'

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sign up data:', formData)
    // Add sign up logic here
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

          <p className="text-center text-unifolio-mediumgray mt-6">
            Already have an account?{' '}
            <a
              href="/Login"
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
