'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page on app start
    router.push('/Login')
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-unifolio-lightgray">
      <div className="text-center">
        <p className="text-unifolio-mediumgray">Redirecting to login...</p>
      </div>
    </div>
  )
}
