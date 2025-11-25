export default function Footer() {
  return (
    <footer className="bg-unifolio-white border-t border-unifolio-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-unifolio-dark font-unifolio-montserrat mb-3">
              Unifolio
            </h3>
            <p className="text-sm text-unifolio-mediumgray max-w-md">
              Create professional resumes tailored to your dream job using
              AI-powered technology and LinkedIn integration.
            </p>
          </div>
        </div>
        <div className="border-t border-unifolio-border mt-8 pt-6 text-center">
          <p className="text-sm text-unifolio-mediumgray">
            © 2025 Unifolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
