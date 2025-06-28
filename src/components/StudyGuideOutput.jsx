import React, { useState } from 'react'
import ExportButtons from './ExportButtons'

const StudyGuideOutput = ({ studyGuide }) => {
  const [showAnswers, setShowAnswers] = useState({})

  const toggleAnswer = (index) => {
    setShowAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl lg:text-2xl font-bold text-white mt-6 mb-3">{line.replace('## ', '')}</h2>
      } else if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split('**: ')
        return (
          <div key={index} className="flex items-start mb-2">
            <span className="font-semibold text-white/90 mr-2">• {parts[0]}:</span>
            <span className="text-white/80">{parts[1]}</span>
          </div>
        )
      } else if (line.startsWith('- ')) {
        return <div key={index} className="ml-4 mb-1 text-white/80">• {line.replace('- ', '')}</div>
      } else if (line.match(/^\d+\./)) {
        return <div key={index} className="ml-4 mb-1 text-white/80">{line}</div>
      } else if (line.trim() === '') {
        return <div key={index} className="h-2"></div>
      } else {
        return <p key={index} className="text-white/80 mb-2 leading-relaxed">{line}</p>
      }
    })
  }

  // Ensure studyGuide has all required properties
  const safeStudyGuide = {
    topic: studyGuide?.topic || 'Unknown Topic',
    summary: studyGuide?.summary || 'No content available.',
    practiceQuestions: studyGuide?.practiceQuestions || [],
    videoRecommendations: studyGuide?.videoRecommendations || [],
    includePracticeQuestions: studyGuide?.includePracticeQuestions || false,
    includeVideos: studyGuide?.includeVideos || false,
    source: studyGuide?.source || null
  }

  return (
    <div className="mt-8 lg:mt-12 space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header with export buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight">
            Study Guide: {safeStudyGuide.topic}
          </h2>
          <p className="text-white/70 mt-1 lg:mt-2 text-sm lg:text-base">
            Generated with AI • {new Date().toLocaleDateString()}
            {safeStudyGuide.source && (
              <span className="ml-2 text-blue-300">
                • Source: {safeStudyGuide.source.name}
              </span>
            )}
          </p>
        </div>
        <ExportButtons studyGuide={safeStudyGuide} />
      </div>

      {/* Source Information */}
      {safeStudyGuide.source && (
        <div className="card backdrop-blur-sm bg-blue-500/20 border border-blue-400/30">
          <div className="flex items-start">
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-300 mr-2 lg:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium text-blue-200 mb-1 lg:mb-2 text-sm lg:text-base">
                Information Source: {safeStudyGuide.source.name}
              </h3>
              <p className="text-blue-300 text-xs lg:text-sm mb-2 lg:mb-3">
                This study guide is based on factual information from {safeStudyGuide.source.name}.
              </p>
              {safeStudyGuide.source.url && (
                <a
                  href={safeStudyGuide.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-300 hover:text-blue-200 text-xs lg:text-sm font-medium transition-colors duration-200"
                >
                  View Original Source
                  <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Study Guide Content */}
      <div className="card backdrop-blur-sm bg-white/10 border border-white/20">
        <div className="prose max-w-none">
          {formatContent(safeStudyGuide.summary)}
        </div>
      </div>

      {/* Practice Questions */}
      {safeStudyGuide.includePracticeQuestions && safeStudyGuide.practiceQuestions && safeStudyGuide.practiceQuestions.length > 0 && (
        <div className="card backdrop-blur-sm bg-white/10 border border-white/20">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 flex items-center">
            <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Practice Questions
          </h3>
          <div className="space-y-4 lg:space-y-6">
            {safeStudyGuide.practiceQuestions.map((q, index) => (
              <div key={index} className="border border-white/20 rounded-lg p-4 lg:p-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4">
                  <h4 className="font-medium text-white text-sm lg:text-base lg:flex-1">
                    Q{index + 1}: {q.question}
                  </h4>
                  <button
                    onClick={() => toggleAnswer(index)}
                    className="btn-secondary text-xs lg:text-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200 px-3 lg:px-4 py-2 rounded-lg"
                  >
                    {showAnswers[index] ? 'Hide Answer' : 'Show Answer'}
                  </button>
                </div>
                {showAnswers[index] && (
                  <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-white/10 rounded-lg animate-slide-up backdrop-blur-sm border border-white/10">
                    <p className="text-white/90 text-sm lg:text-base">
                      <strong className="text-blue-300">A:</strong> {q.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Recommendations */}
      {safeStudyGuide.includeVideos && safeStudyGuide.videoRecommendations && Array.isArray(safeStudyGuide.videoRecommendations) && safeStudyGuide.videoRecommendations.length > 0 && (
        <div className="card backdrop-blur-sm bg-white/10 border border-white/20">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 flex items-center">
            <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Video Recommendations
          </h3>
          <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safeStudyGuide.videoRecommendations.map((video, index) => (
              <div key={index} className="border border-white/20 rounded-lg p-4 lg:p-6 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm bg-white/5">
                <div className="flex items-start space-x-3 lg:space-x-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-red-400/30">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm lg:text-base line-clamp-2 mb-1 lg:mb-2">
                      {video.title}
                    </h4>
                    <p className="text-xs lg:text-sm text-white/60 mb-2 lg:mb-3">
                      {video.duration} • {video.description}
                    </p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs lg:text-sm text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
                    >
                      Watch Video
                      <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyGuideOutput 