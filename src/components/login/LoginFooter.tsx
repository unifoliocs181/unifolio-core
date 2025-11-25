const LoginFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-unifolio-dark border-t border-unifolio-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
            <style>{`.grid.mb-8 > .border-t { display: none; }`}</style>
          </div>
        </div>

        <div className="border-t border-unifolio-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <p className="text-unifolio-mediumgray text-sm">
            &copy; {currentYear} unifolio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <a
              href="https://www.linkedin.com/company/cs180unifolio/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BWEJ1bcuDRYiaLKcOJvR11w%3D%3D"
              className="text-unifolio-gray hover:text-unifolio-white transition-colors"
            >
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="https://github.com/unifoliocs181/unifolio-core"
              className="text-unifolio-gray hover:text-unifolio-white transition-colors"
            >
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LoginFooter
