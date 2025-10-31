import React from 'react'
import LoginHeader from '../../components/Login/LoginHeader'
import LoginFooter from '../../components/Login/LoginFooter'

const login = () => {
    return (
        <div className="min-h-screen bg-unifolio-lightgray">
            <LoginHeader />

            {/* Login Form Section */}
            <div className="flex items-center justify-center py-16 px-4">
                <div className="w-full max-w-md bg-unifolio-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-unifolio-dark mb-2">Welcome Back</h2>
                    <p className="text-unifolio-mediumgray mb-6">Sign in to your account to continue</p>

                    <form className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-unifolio-dark font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-unifolio-dark font-medium mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-unifolio-border rounded-lg focus:outline-none focus:ring-2 focus:ring-unifolio-gray"
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-unifolio-mediumgray">Remember me</span>
                            </label>
                            <a href="#" className="text-unifolio-gray hover:text-unifolio-dark">
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-unifolio-dark text-unifolio-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-6"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-unifolio-mediumgray mt-6">
                        Dont have an account?{' '}
                        <a href="#" className="text-unifolio-dark font-semibold hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
            <LoginFooter />
        </div>
    )
}

export default login