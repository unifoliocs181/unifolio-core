const LoginFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-unifolio-dark border-t border-unifolio-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-unifolio-gray rounded-lg flex items-center justify-center">
                <span className="text-unifolio-dark font-bold">U</span>
              </div>
              <h3 className="text-unifolio-white font-bold text-lg">
                unifolio
              </h3>
            </div>
            <p className="text-unifolio-mediumgray text-sm">
              Create stunning portfolios with ease.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-unifolio-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-unifolio-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-unifolio-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm"
                >
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-unifolio-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-unifolio-mediumgray text-sm">
            &copy; {currentYear} unifolio. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <a
              href="#"
              className="text-unifolio-gray hover:text-unifolio-white transition-colors"
            >
              <span className="text-sm">Twitter</span>
            </a>
            <a
              href="#"
              className="text-unifolio-gray hover:text-unifolio-white transition-colors"
            >
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="#"
              className="text-unifolio-gray hover:text-unifolio-white transition-colors"
            >
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="#"
              className="text-unifolio-gray hover:text-unifolio-white transition-colors"
            >
              <span className="text-sm">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LoginFooter
