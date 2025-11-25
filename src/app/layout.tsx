import './globals.css'
import { Montserrat } from 'next/font/google'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from './api/uploadthing/core'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--montserrat-font',
})

export const metadata = {
  title: 'Unifolio - Make Your Resume',
  description:
    'Create and customize your resume effortlessly with Unifolio just by linking your LinkedIn. Choose from a variety of templates and styles to showcase your skills and experience.',
  icons: {
    icon: '/1763018776886.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
      </body>
    </html>
  )
}
