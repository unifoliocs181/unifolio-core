'use client'

const SignUpHeader = () => {
  return (
    <div className="signup-header-container">
      <div className="w-full bg-unifolio-dark border-b border-unifolio-border py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo/Brand Section */}
          <div className="flex items-center gap-3">
            <div className="signup-logo-badge w-12 h-12 bg-unifolio-gray rounded-lg flex items-center justify-center">
              <span className="text-unifolio-dark font-bold text-lg">U</span>
            </div>
            <div className="signup-brand-text">
              <h1 className="text-unifolio-white text-2xl font-bold">
                unifolio
              </h1>
              <p className="text-unifolio-mediumgray text-sm">
                Create Your Portfolio
              </p>
            </div>
          </div>

          {/* Back to Login */}
          <a
            href="/login"
            className="signup-back-button text-unifolio-gray hover:text-unifolio-white transition-colors px-4 py-2"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignUpHeader
