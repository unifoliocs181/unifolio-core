'use client'

import React, { useEffect, useState } from 'react'
import SignUpHeader from '../components/SignUp/SignUpHeader'
import SignUpFooter from '../components/SignUp/SignUpFooter'

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    })

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        import('animejs').then((animeModule: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const anime = animeModule as any

            // Animate form on mount
            anime.timeline().add({
                targets: '.signup-form-container',
                opacity: [0, 1],
                scale: [0.95, 1],
                duration: 600,
                easing: 'easeOutQuad',
            }).add({
                targets: '.signup-form-input',
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 400,
                delay: anime.stagger(80),
                easing: 'easeOutQuad',
            }, 100).add({
                targets: '.signup-submit-btn',
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 400,
                easing: 'easeOutQuad',
            }, 200)
        })
    }, [])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
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
                        {/* Full Name Input */}
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

                        {/* Email Input */}
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

                        {/* Password Input */}
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

                        {/* Confirm Password Input */}
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

                        {/* Terms & Conditions */}
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
                                <a href="#" className="text-unifolio-dark font-semibold hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-unifolio-dark font-semibold hover:underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="signup-submit-btn w-full bg-unifolio-dark text-unifolio-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-6"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Sign In Link */}
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
