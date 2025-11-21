'use client'
import DashboardHeader from '../../components/DashboardHeader'
import DashboardFooter from '../../components/DashboardFooter'
import { useRouter } from 'next/navigation'
import { auth, getUserFromDatabase, UserData } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState, useRef } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loadingUserData, setLoadingUserData] = useState(true)
  const [jobDescription, setJobDescription] = useState('')
  const [currResume, setCurrResume] = useState<File | null>(null)
  const [linkedInProfile, setLinkedInProfile] = useState<File | null>(null)
  const [showModal, setShowModal] = useState(false)
  const currResumeInputRef = useRef<HTMLInputElement>(null)
  const linkedInProfileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getUserFromDatabase(user.uid)
          setUserData(data)
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoadingUserData(false)
        }
      }
    }

    fetchUserData()
  }, [user])

  const handleCurrResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        alert('File size must be less than 10MB')
        return
      }
      setCurrResume(file)
    }
  }

  const handleLinkedInProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        alert('File size must be less than 10MB')
        return
      }
      setLinkedInProfile(file)
    }
  }

  const handleGenerateResume = () => {
    setShowModal(true)
  }

  if (loading || loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-unifolio-lightgray">
        <p className="text-unifolio-mediumgray">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <DashboardHeader user={user} userName={userData?.fullName} />

      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userData?.fullName || 'User'}!
          </h1>
          <p className="text-gray-400">
            Create your perfect resume tailored to your job description
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Job Description
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Paste the job description below to tailor your resume
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste your job description here..."
              className="w-full h-64 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none text-white placeholder-gray-500"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">
                Upload LinkedIn Profile PDF
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Upload your LinkedIn Profile as a PDF. Go to your profile, click &quot;More&quot;, and select &quot;Save to PDF&quot;.
              </p>
              <input
                type="file"
                ref={linkedInProfileInputRef}
                onChange={handleLinkedInProfileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <button
                onClick={() => linkedInProfileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-600 rounded-lg p-8 hover:border-gray-500 transition-colors bg-gray-900/50 cursor-pointer min-h-[150px]"
              >
                {linkedInProfile ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">
                        {linkedInProfile.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(linkedInProfile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="h-10 w-10 text-gray-500 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm font-medium text-white mb-1">
                      Click to upload document
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOC, or DOCX (Max 10MB)
                    </p>
                  </div>
                )}
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">
                Upload Current Resume
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Upload your existing resume (Max 10MB)
              </p>
              <input
                type="file"
                ref={currResumeInputRef}
                onChange={handleCurrResumeChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <button
                onClick={() => currResumeInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors bg-gray-900/50 cursor-pointer"
              >
                {currResume ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">
                        {currResume.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(currResume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="h-10 w-10 text-gray-500 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm font-medium text-white mb-1">
                      Click to upload resume
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOC, or DOCX (Max 10MB)
                    </p>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleGenerateResume}
            className="bg-gray-900 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-gray-950 transition-all shadow-lg border border-gray-700"
          >
            Generate Resume
          </button>
          <button
            onClick={() => {
              router.push('/editprofile')
            }}
            className="mt-6 ml-4 bg-unifolio-gray text-unifolio-dark px-6 py-2 rounded-lg font-semibold hover:bg-unifolio-lightgray transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </main>

      <DashboardFooter />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-900/30 mb-4">
                <svg
                  className="h-6 w-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Functionality Pending
              </h3>
              <p className="text-gray-400 mb-6">
                This feature is currently under development. Check back soon!
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-950 transition-all border border-gray-700"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
