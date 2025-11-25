import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            About Unifolio
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Unifolio is dedicated to making professional resume creation
              simple, efficient, and accessible to everyone. We believe that
              your resume shouldn&rsquo;t be a tedious process—it should be a
              reflection of your unique professional journey.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How It Works
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Link Your LinkedIn
                  </h3>
                  <p className="text-gray-600">
                    Connect your LinkedIn profile to automatically import your
                    professional data and work history.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Choose a Template
                  </h3>
                  <p className="text-gray-600">
                    Select from our professionally designed resume templates
                    that showcase your experience in the best light.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Customize & Generate
                  </h3>
                  <p className="text-gray-600">
                    Edit your content, apply AI-powered enhancements, and
                    generate a polished PDF ready to share with employers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Unifolio?
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>
                  <strong>AI-Powered Enhancement:</strong> Leverage artificial
                  intelligence to improve your resume content and make it stand
                  out.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>
                  <strong>LinkedIn Integration:</strong> Seamlessly import your
                  professional profile data in seconds.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>
                  <strong>Professional Templates:</strong> Access a curated
                  collection of ATS-friendly resume templates.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>
                  <strong>Easy Customization:</strong> Edit every aspect of your
                  resume with our intuitive editor.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>
                  <strong>PDF Export:</strong> Download your resume as a
                  beautifully formatted PDF file.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
