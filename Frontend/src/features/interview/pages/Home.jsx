import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const { handleLogout } = useAuth()

    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("")
    const [error, setError] = useState("")

    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (!file) {
            setSelectedFileName("")
            return
        }

        if (file.type !== "application/pdf") {
            setError("Only PDF file is allowed.")
            e.target.value = ""
            setSelectedFileName("")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("File size should be less than 5MB.")
            e.target.value = ""
            setSelectedFileName("")
            return
        }

        setError("")
        setSelectedFileName(file.name)
    }

    const handleLogoutClick = async () => {
        await handleLogout()
        navigate("/login")
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]

        if (!jobDescription.trim()) {
            setError("Please enter job description.")
            return
        }

        if (!resumeFile && !selfDescription.trim()) {
            setError("Please upload resume or enter self description.")
            return
        }

        setError("")

        const data = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile
        })

        if (data?._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <>
            <nav className="app-navbar">
               <div className="app-logo">
  <img
    src="/Image.png"
    alt="Image AI Logo"
    className="app-logo__image"
  />
  
</div>

                <div className="app-nav-links">
                    <button onClick={handleLogoutClick} className="logout-btn">
                        Logout
                    </button>
                </div>
            </nav>

            <div className='home-page'>
                <header className='page-header'>
                    <h1>
                        Create Your Custom <span className='highlight'>Interview Plan</span>
                    </h1>
                    <p>
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </header>

                <div className='interview-card'>
                    <div className='interview-card__body'>
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                </span>

                                <h2>Target Job Description</h2>
                                <span className='badge badge--required'>Required</span>
                            </div>

                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className='panel__textarea'
                                placeholder={`Paste the job description here...\nInclude role responsibilities, required skills, experience level, and preferred technologies.`}
                                maxLength={5000}
                            />

                            <div className='char-counter'>
                                {jobDescription.length} / 5000 chars
                            </div>
                        </div>

                        <div className='panel-divider' />

                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </span>

                                <h2>Your Profile</h2>
                            </div>

                            <div className='upload-section'>
                                <label className='section-label'>
                                    Upload Resume
                                    <span className='badge badge--best'>Best Results</span>
                                </label>

                                <label className='dropzone' htmlFor='resume'>
                                    <span className='dropzone__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="16 16 12 12 8 16" />
                                            <line x1="12" y1="12" x2="12" y2="21" />
                                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                        </svg>
                                    </span>

                                    <p className='dropzone__title'>
                                        {selectedFileName || "Click to upload or drag & drop"}
                                    </p>

                                    <p className='dropzone__subtitle'>PDF only (Max 5MB)</p>

                                    <input
                                        ref={resumeInputRef}
                                        hidden
                                        type='file'
                                        id='resume'
                                        name='resume'
                                        accept='application/pdf,.pdf'
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>

                            <div className='or-divider'>
                                <span>OR</span>
                            </div>

                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>
                                    Quick Self-Description
                                </label>

                                <textarea
                                    value={selfDescription}
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="Briefly describe your skills, projects, experience, achievements, and target role if you are not uploading a resume."
                                />
                            </div>

                            {error && (
                                <div className="error-box">
                                    {error}
                                </div>
                            )}

                            <div className='info-box'>
                                <span className='info-box__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </span>

                                <p>
                                    Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='interview-card__footer'>
                        <span className='footer-info'>
                            AI-Powered Strategy Generation • Approx 30s
                        </span>

                        <button onClick={handleGenerateReport} className='generate-btn'>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </div>

                {reports.length > 0 && (
                    <section className='recent-reports'>
                        <h2>My Recent Interview Plans</h2>

                        <ul className='reports-list'>
                            {reports.slice(0, 5).map(report => (
                                <li
                                    key={report._id}
                                    className='report-item'
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <h3>{report.title || 'Untitled Position'}</h3>

                                    <p className='report-meta'>
                                        Generated on {new Date(report.createdAt).toLocaleDateString()}
                                    </p>

                                    <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                        Match Score: {report.matchScore}%
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            <footer className="app-footer">
                <p>© 2026 Interlyst AI. All rights reserved.</p>

                <div className="footer-links">
                    <a href="#">Project Info</a>
                    <a href="#">Features</a>
                    <a href="mailto:abhish.poddar@gmail.com">Contact</a>
                </div>
            </footer>
        </>
    )
}

export default Home