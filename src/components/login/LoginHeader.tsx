const LoginHeader = () => {
  return (
    <div className="w-full bg-unifolio-dark border-b border-unifolio-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo/Brand Section */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-unifolio-gray rounded-lg flex items-center justify-center">
            <span className="text-unifolio-dark font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="text-unifolio-white text-2xl font-bold">unifolio</h1>
            <p className="text-unifolio-mediumgray text-sm">
              Portfolio Platform
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-unifolio-gray hover:text-unifolio-white transition-colors"
          >
            Features
          </a>
          <a
            href="#"
            className="text-unifolio-gray hover:text-unifolio-white transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-unifolio-gray hover:text-unifolio-white transition-colors"
          >
            Pricing
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="text-unifolio-gray hover:text-unifolio-white transition-colors px-4 py-2">
            Sign In
          </button>
          <button className="bg-unifolio-gray text-unifolio-dark px-6 py-2 rounded-lg font-semibold hover:bg-unifolio-lightgray transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginHeader
