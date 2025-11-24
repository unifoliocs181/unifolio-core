'use client'
import { useRouter } from 'next/navigation'
import { auth } from '../app/firebase'
import { useState, useRef, useEffect } from 'react'
import { User } from 'firebase/auth'

interface DashboardHeaderProps {
  user?: User | null
  userName?: string
}

export default function DashboardHeader({
  user,
  userName,
}: DashboardHeaderProps) {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    localStorage.removeItem('rememberedEmail')
    localStorage.removeItem('rememberedPassword')
    localStorage.removeItem('lastLoginMethod')
    localStorage.removeItem('rememberMe')
    await auth.signOut()
    router.push('/login')
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a
              href="/dashboard"
              className="text-2xl font-bold text-white font-unifolio-montserrat hover:opacity-80 transition-opacity"
            >
              Unifolio
            </a>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="/dashboard"
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Dashboard
            </a>
            <a
  href="/resumes"
  className="text-gray-400 hover:text-white transition-colors font-medium"
>
  My Resumes
</a>

            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              Settings
            </a>
          </nav>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold hover:bg-gray-950 transition-all shadow-lg border border-gray-600">
                {getInitials(userName)}
              </div>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-700">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-semibold text-white truncate">
                    {userName || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <a
                  href="/user/settings"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Settings
                </a>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
