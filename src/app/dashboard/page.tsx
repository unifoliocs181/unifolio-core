'use client'

import DashboardHeader from '../../components/DashboardHeader'
import DashboardFooter from '../../components/DashboardFooter'
import { useRouter } from 'next/navigation'
import { auth, getUserFromDatabase, UserData } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { resumeTemplates } from '../templates/resumes'
import { UploadButton } from '../utils/uploadthing'
import { addResumeLink } from '../firebase'
export default function Dashboard() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loadingUserData, setLoadingUserData] = useState(true)
  const [generatedLatex, setGeneratedLatex] = useState<string | null>(null)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [loadingSteps, setLoadingSteps] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedPdf, setGeneratedPdf] = useState<Blob | null>(null)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const [resumeName, setResumeName] = useState<string | null>(null)
  const [linkedInUrl, setLinkedInUrl] = useState<string | null>(null)
  const [linkedInName, setLinkedInName] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

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

  const handleGenerateResume = async (templateId: string) => {
    if (!jobDescription.trim()) {
      alert('Please paste the job description before generating your resume.')
      return
    }

    if (!resumeUrl || !linkedInUrl) {
      alert('Please upload both PDFs first.')
      return
    }

    setIsProcessing(true)
    setLoadingSteps(['Parsing PDFs...'])

    const parseResponse = await fetch('/api/pdf-parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        urls: [linkedInUrl, resumeUrl],
      }),
    })

    const parseData = await parseResponse.json()
    if (!parseData.success) {
      alert('Failed to parse PDFs.')
      setIsProcessing(false)
      return
    }

    const profileInfo = parseData.results.pdf1
    const resumeText = parseData.results.pdf2

    setLoadingSteps((s) => [...s, 'Generating Resume...'])

    const agentResponse = await fetch('/api/run-agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileInfo,
        resumeText,
        jobDescription,
        templateId,
      }),
    })

    const agentData = await agentResponse.json()
    if (!agentData.success) {
      alert('Resume generation failed. Please try again.')
      setIsProcessing(false)
      return
    }

    const latexCode = agentData.latex
    setLoadingSteps((s) => [...s, 'Converting to PDF...'])
    setGeneratedLatex(latexCode)
    const pdfRes = await fetch('/api/generation/pdf-generation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latex: latexCode }),
    })

    const pdfBlob = await pdfRes.blob()
    const pdfFile = new File([pdfBlob], 'resume.pdf', {
      type: 'application/pdf',
    })
    const formData = new FormData()
    formData.append('file', pdfFile)

    const uploadResponse = await fetch('/api/uploadresume', {
      method: 'POST',
      body: formData,
    })

    const uploadJson = await uploadResponse.json()

    if (!uploadJson.success) {
      console.error('Failed to upload generated resume')
    } else {
      const resumeUrl = uploadJson.url
      if (!user) return
      const resumeName = `${selectedTemplate}-resume-${Date.now()}.pdf`
      await addResumeLink(user.uid, resumeName, resumeUrl)
    }

    setGeneratedPdf(pdfBlob)
    setIsProcessing(false)
    setShowPdfModal(true)
  }

  if (loading || loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-unifolio-lightgray">
        <p className="text-unifolio-mediumgray">Loading...</p>
      </div>
    )
  }

  if (!user) return null

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
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste your job description here..."
              className="w-full h-64 p-4 bg-gray-900 border border-gray-600 rounded-lg text-white resize-none"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">
                Upload LinkedIn Profile PDF
              </h2>

              {!linkedInUrl ? (
                <UploadButton
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res) => {
                    setLinkedInUrl(res[0].ufsUrl)
                    setLinkedInName(res[0].name)
                  }}
                  onUploadError={(err) => alert(err.message)}
                />
              ) : (
                <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div>
                    <p className="text-green-400 text-sm font-medium">
                      {linkedInName}
                    </p>
                    <a
                      href={linkedInUrl}
                      target="_blank"
                      className="text-gray-400 text-xs underline hover:text-gray-300"
                    >
                      Preview PDF
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setLinkedInUrl(null)
                      setLinkedInName(null)
                    }}
                    className="text-red-400 hover:text-red-300 text-sm font-semibold px-3 py-1 border border-red-400 rounded-lg hover:bg-red-400/10 transition"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">
                Upload Current Resume
              </h2>

              {!resumeUrl ? (
                <UploadButton
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res) => {
                    setResumeUrl(res[0].ufsUrl)
                    setResumeName(res[0].name)
                  }}
                  onUploadError={(err) => alert(err.message)}
                />
              ) : (
                <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div>
                    <p className="text-green-400 text-sm font-medium">
                      {resumeName}
                    </p>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      className="text-gray-400 text-xs underline hover:text-gray-300"
                    >
                      Preview PDF
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setResumeUrl(null)
                      setResumeName(null)
                    }}
                    className="text-red-400 hover:text-red-300 text-sm font-semibold px-3 py-1 border border-red-400 rounded-lg hover:bg-red-400/10 transition"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              const missing: string[] = []

              if (!jobDescription.trim()) missing.push('Job Description')
              if (!linkedInUrl) missing.push('LinkedIn PDF')
              if (!resumeUrl) missing.push('Resume PDF')

              if (missing.length > 0) {
                alert(
                  `Please provide the following before continuing:\n\n- ${missing.join('\n- ')}`
                )
                return
              }

              setShowTemplateModal(true)
            }}
            className="bg-gray-900 text-white px-12 py-4 rounded-lg font-semibold border border-gray-700 hover:bg-gray-950"
          >
            Generate Resume
          </button>
        </div>
      </main>

      <DashboardFooter />

      {/* PROCESSING MODAL */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 shadow-xl rounded-xl p-8 w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-white mb-4">
              Building Your Resume...
            </h2>

            <div className="space-y-2 text-gray-300">
              {loadingSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 justify-center"
                >
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <div className="w-8 h-8 border-4 border-gray-600 border-t-green-400 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATE PICKER */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Choose a Resume Template
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resumeTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`border rounded-lg p-3 bg-gray-900 hover:bg-gray-800 cursor-pointer ${selectedTemplate === template.id ? 'border-green-400' : 'border-gray-700'}`}
                >
                  <iframe
                    src={template.pdfUrl}
                    className="w-full h-64 border border-gray-700 rounded"
                  />
                  <div className="mt-3 text-center text-white font-medium">
                    {template.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                disabled={!selectedTemplate}
                onClick={() => {
                  setShowTemplateModal(false)
                  handleGenerateResume(selectedTemplate!)
                }}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedTemplate
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 text-gray-400'
                }`}
              >
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF PREVIEW MODAL */}
      {showPdfModal && generatedPdf && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Your Resume is Ready
            </h2>

            <iframe
              src={URL.createObjectURL(generatedPdf)}
              className="w-full h-[600px] border border-gray-700 rounded"
            />

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowPdfModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
              <a
                href={URL.createObjectURL(
                  new Blob([generatedLatex || ''], { type: 'text/plain' })
                )}
                download="resume.tex"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download TEX
              </a>

              <a
                href={URL.createObjectURL(generatedPdf)}
                download="resume.pdf"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
