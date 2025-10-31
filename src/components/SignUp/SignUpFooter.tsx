'use client'

import React, { useEffect } from 'react'

const SignUpFooter = () => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        import('animejs').then((animeModule: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const anime = animeModule as any

            // Animate footer on mount
            anime({
                targets: '.signup-footer',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                easing: 'easeOutQuad',
            })
        })
    }, [])

    const currentYear = new Date().getFullYear()

    return (
        <footer className="signup-footer w-full bg-unifolio-dark border-t border-unifolio-border mt-auto py-8 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                    <p className="text-unifolio-mediumgray text-sm">
                        &copy; {currentYear} unifolio. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm">
                            Terms
                        </a>
                        <a href="#" className="text-unifolio-gray hover:text-unifolio-white transition-colors text-sm">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default SignUpFooter
