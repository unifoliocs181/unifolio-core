import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-unifolio-white border-b border-unifolio-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-unifolio-dark font-unifolio-montserrat hover:opacity-90 transition-opacity"
            >
              Unifolio
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
           
            <Link
              href="/about"
              className="text-unifolio-mediumgray hover:text-unifolio-dark transition-colors font-medium"
            >
              About
            </Link>
            
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="text-unifolio-dark hover:text-unifolio-mediumgray transition-colors font-medium"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="bg-unifolio-dark text-unifolio-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
