'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function About() {
    return (
        <div className="min-h-screen flex flex-col bg-unifolio-dark text-unifolio-white">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-unifolio-dark">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Unifolio</h1>
                        <p className="text-lg md:text-xl text-unifolio-mediumgray leading-relaxed">
                            Unifolio is a student-led project designed to simplify resume creation and portfolio building. We believe that showcasing your skills and experience should be effortless and intuitive.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 md:py-24 border-t border-unifolio-border">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg text-unifolio-mediumgray leading-relaxed mb-6">
                            We&rsquo;re a team of students passionate about leveraging technology to help our peers succeed in their career journeys. Our mission is to create an intuitive platform that transforms the tedious process of resume building into a seamless, enjoyable experience.
                        </p>
                        <p className="text-lg text-unifolio-mediumgray leading-relaxed">
                            By integrating with LinkedIn and offering multiple customizable templates, Unifolio enables students to create professional, polished resumes in minutes – not hours.
                        </p>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 md:py-24 bg-unifolio-lightgray border-t border-unifolio-border">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-unifolio-mediumgray">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-unifolio-dark rounded-lg p-6 border border-unifolio-border">
                                <div className="text-3xl font-bold text-unifolio-primary mb-4">1</div>
                                <h3 className="text-xl font-semibold mb-3 text-unifolio-white">Link Your LinkedIn</h3>
                                <p className="text-unifolio-mediumgray">
                                    Connect your LinkedIn profile to automatically populate your resume with your professional information.
                                </p>
                            </div>
                            <div className="bg-unifolio-dark rounded-lg p-6 border border-unifolio-border">
                                <div className="text-3xl font-bold text-unifolio-primary mb-4">2</div>
                                <h3 className="text-xl font-semibold mb-3 text-unifolio-white">Choose a Template</h3>
                                <p className="text-unifolio-mediumgray">
                                    Browse through our collection of professionally designed templates and select the one that matches your style.
                                </p>
                            </div>
                            <div className="bg-unifolio-dark rounded-lg p-6 border border-unifolio-border">
                                <div className="text-3xl font-bold text-unifolio-primary mb-4">3</div>
                                <h3 className="text-xl font-semibold mb-3 text-unifolio-white">Customize & Download</h3>
                                <p className="text-unifolio-mediumgray">
                                    Fine-tune your resume with our intuitive editor, then download it as a PDF ready to share with employers.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 md:py-24 border-t border-unifolio-border">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Built by Students</h2>
                        <p className="text-lg text-unifolio-mediumgray leading-relaxed mb-8">
                            Unifolio is developed and maintained by a dedicated team of computer science and engineering students. We understand the challenges of resume building because we&rsquo;ve been there ourselves. Our diverse backgrounds and perspectives help us create a platform that truly serves students across different majors and experience levels.
                        </p>
                        <div className="bg-unifolio-lightgray rounded-lg p-8 border border-unifolio-border">
                            <h3 className="text-2xl font-semibold mb-4 text-unifolio-mediumgray">Our Values</h3>
                            <ul className="space-y-3 text-unifolio-mediumgray">
                                <li className="flex items-start">
                                    <span className="text-unifolio-primary font-bold mr-3">•</span>
                                    <span><strong>Simplicity:</strong> We believe great tools should be intuitive and easy to use.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-unifolio-primary font-bold mr-3">•</span>
                                    <span><strong>Accessibility:</strong> Resume building should be accessible to all students, regardless of technical skills.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-unifolio-primary font-bold mr-3">•</span>
                                    <span><strong>Innovation:</strong> We continuously improve our platform with student feedback and new features.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-unifolio-primary font-bold mr-3">•</span>
                                    <span><strong>Community:</strong> Supporting our peers is at the heart of everything we do.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-unifolio-lightgray border-t border-unifolio-border">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-unifolio-mediumgray">Ready to Get Started?</h2>
                        <p className="text-lg text-unifolio-mediumgray mb-8">
                            Join hundreds of students who&rsquo;ve already created their professional resumes with Unifolio.
                        </p>
                        <a
                            href="/login"
                            className="inline-block px-8 py-3 bg-unifolio-primary text-unifolio-dark font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                        >
                            Create Your Resume
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}