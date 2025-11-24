'use client';

import DashboardHeader from '../../components/DashboardHeader';
import DashboardFooter from '../../components/DashboardFooter';
import { useRouter } from 'next/navigation';
import { auth, getUserFromDatabase, UserData } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

import { UploadButton } from "../utils/uploadthing";

export default function Dashboard() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  const [jobDescription, setJobDescription] = useState('');

  // Uploaded PDFs
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);

  const [linkedInUrl, setLinkedInUrl] = useState<string | null>(null);
  const [linkedInName, setLinkedInName] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getUserFromDatabase(user.uid);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoadingUserData(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleGenerateResume = async () => {
    if (!resumeUrl || !linkedInUrl) {
      alert('Please upload both PDFs first.');
      return;
    }

    console.log('Resume URL:', resumeUrl);
    console.log('LinkedIn URL:', linkedInUrl);

    const res = await fetch('/api/pdf-parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: [resumeUrl, linkedInUrl] }),
    });

    const data = await res.json();
    console.log(data);
  };

  if (loading || loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-unifolio-lightgray">
        <p className="text-unifolio-mediumgray">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

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
          {/* Job Description */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
            <p className="text-sm text-gray-400 mb-4">
              Paste the job description below to tailor your resume
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste your job description here..."
              className="w-full h-64 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none text-white placeholder-gray-500"
            />
          </div>

          {/* Upload Section */}
          <div className="space-y-6">
            {/* LinkedIn Upload */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Upload LinkedIn Profile PDF</h2>
              <p className="text-sm text-gray-400 mb-4">
                Upload your LinkedIn Profile as a PDF. Go to your profile, click "More", and select "Save to PDF".
              </p>

              {!linkedInUrl ? (
                <UploadButton
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res) => {
                    setLinkedInUrl(res[0].ufsUrl);
                    setLinkedInName(res[0].name);
                  }}
                  onUploadError={(err) => alert(err.message)}
                />
              ) : (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  className="text-green-400 underline text-sm hover:text-green-300"
                >
                  {linkedInName}
                </a>
              )}
            </div>

            {/* Resume Upload */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Upload Current Resume</h2>
              <p className="text-sm text-gray-400 mb-4">
                Upload your existing resume (Max 10MB)
              </p>

              {!resumeUrl ? (
                <UploadButton
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res) => {
                    setResumeUrl(res[0].ufsUrl);
                    setResumeName(res[0].name);

                  }}
                  onUploadError={(err) => alert(err.message)}
                />
              ) : (
                <a
                  href={resumeUrl}
                  target="_blank"
                  className="text-green-400 underline text-sm hover:text-green-300"
                >
                  {resumeName}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleGenerateResume}
            className="bg-gray-900 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-gray-950 transition-all shadow-lg border border-gray-700"
          >
            Generate Resume
          </button>

          <button
            onClick={() => router.push('/editprofile')}
            className="mt-6 ml-4 bg-unifolio-gray text-unifolio-dark px-6 py-2 rounded-lg font-semibold hover:bg-unifolio-lightgray transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </main>

      <DashboardFooter />

      {/* Feature Pending Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-900/30 mb-4">
                <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Functionality Pending</h3>
              <p className="text-gray-400 mb-6">This feature is currently under development. Check back soon!</p>
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
  );
}
