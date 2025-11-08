'use client'

import React, { useEffect } from 'react'

const SignUpHeader = () => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        import('animejs').then((animeModule: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const anime = animeModule as any

            // Animate the header on mount
            anime.timeline().add({
                targets: '.signup-header-container',
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 800,
                easing: 'easeOutQuad',
            }).add({
                targets: '.signup-logo-badge',
                scale: [0.5, 1],
                rotate: [0, 360],
                duration: 600,
                easing: 'easeOutBounce',
            }, 200).add({
                targets: '.signup-brand-text',
                opacity: [0, 1],
                translateX: [-20, 0],
                duration: 600,
                easing: 'easeOutQuad',
            }, 300)

            // Add hover animations
            const backButton = document.querySelector('.signup-back-button')
            if (backButton) {
                backButton.addEventListener('mouseenter', () => {
                    anime({
                        targets: backButton,
                        translateX: -5,
                        duration: 300,
                        easing: 'easeOutQuad',
                    })
                })
                backButton.addEventListener('mouseleave', () => {
                    anime({
                        targets: backButton,
                        translateX: 0,
                        duration: 300,
                        easing: 'easeOutQuad',
                    })
                })
            }
        })
    }, [])

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
                            <h1 className="text-unifolio-white text-2xl font-bold">unifolio</h1>
                            <p className="text-unifolio-mediumgray text-sm">Create Your Portfolio</p>
                        </div>
                    </div>

                    {/* Back to Login */}
                    <a
                        href="/Login"
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
