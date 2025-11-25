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
            href="/about"
            className="text-unifolio-gray hover:text-unifolio-white transition-colors"
          >
            About
          </a>
        </nav>

        {/* Right Section */}
        
      </div>
    </div>
  )
}

export default LoginHeader
