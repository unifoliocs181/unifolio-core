'use client'

import { useEffect, useState } from 'react'
import {
  auth,
  getUserFromDatabase,
  deleteResumeLink,
  renameResume,
  ResumeEntry,
} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import DashboardHeader from '../../components/DashboardHeader'
import DashboardFooter from '../../components/DashboardFooter'

export default function ResumesPage() {
  const [user, loading] = useAuthState(auth)
  const [resumes, setResumes] = useState<ResumeEntry[]>([])
  const [loadingResumes, setLoadingResumes] = useState(true)

  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')

  // Load resumes
  useEffect(() => {
    if (!user) return

    ;(async () => {
      const data = await getUserFromDatabase(user.uid)
      setResumes(data?.resumes || [])
      setLoadingResumes(false)
    })()
  }, [user])

  const handleDelete = async (id: string) => {
    if (!user) return

    await deleteResumeLink(user.uid, id)

    setResumes((prev) => prev.filter((r) => r.id !== id))
  }

  const handleRename = async (id: string) => {
    if (!user || !newName.trim()) return

    await renameResume(user.uid, id, newName.trim())

    setResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name: newName.trim() } : r))
    )

    setRenamingId(null)
    setNewName('')
  }

  if (loading) return <div className="text-white p-10">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <DashboardHeader user={user} />

      <main className="grow max-w-6xl w-full mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-white mb-6">My Resumes</h1>

        {loadingResumes ? (
          <p className="text-gray-400">Loading resumes...</p>
        ) : resumes.length === 0 ? (
          <p className="text-gray-500">You have no saved resumes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg"
              >
                {/* PDF Preview */}
                <iframe
                  src={resume.url}
                  className="w-full h-[450px] rounded border border-gray-700"
                />

                {/* Resume name */}
                <p className="text-gray-200 text-lg font-semibold mt-4">
                  {resume.name}
                </p>

                {/* Rename Mode */}
                {renamingId === resume.id ? (
                  <div className="flex gap-3 mt-4">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1 px-3 py-1 bg-gray-900 text-white border border-gray-700 rounded"
                    />
                    <button
                      onClick={() => handleRename(resume.id)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setRenamingId(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between mt-5">
                    <a
                      href={resume.url}
                      target="_blank"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      View
                    </a>

                    <button
                      onClick={() => {
                        setRenamingId(resume.id)
                        setNewName(resume.name)
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded"
                    >
                      Rename
                    </button>

                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <DashboardFooter />
    </div>
  )
}
