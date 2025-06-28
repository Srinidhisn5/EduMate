import React, { useState } from 'react'

const InputForm = ({ onGenerate, loading }) => {
  const [topic, setTopic] = useState('')
  const [options, setOptions] = useState({
    includePracticeQuestions: true,
    includeVideos: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (topic.trim()) {
      onGenerate(topic.trim(), options)
    }
  }

  const handleOptionChange = (option) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  return (
    <div className="card backdrop-blur-sm bg-white/10 border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
        <div>
          <label htmlFor="topic" className="block text-sm lg:text-base font-medium text-white mb-2 lg:mb-3">
            What would you like to study?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Quantum Physics, JavaScript, World War II, Calculus..."
            className="input-field text-base lg:text-lg bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-200"
            disabled={loading}
            required
          />
          <p className="mt-2 lg:mt-3 text-sm lg:text-base text-white/70">
            Be specific! The more detailed your topic, the better your study guide will be.
          </p>
        </div>

        <div>
          <label className="block text-sm lg:text-base font-medium text-white mb-3 lg:mb-4">
            Customize your study guide:
          </label>
          <div className="space-y-3 lg:space-y-4">
            <label className="flex items-center p-3 lg:p-4 rounded-lg hover:bg-white/5 transition-colors duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includePracticeQuestions}
                onChange={() => handleOptionChange('includePracticeQuestions')}
                className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500 focus:ring-blue-400 border-white/30 rounded bg-white/10 focus:bg-white/20"
                disabled={loading}
              />
              <span className="ml-3 lg:ml-4 text-white/90 text-sm lg:text-base">
                Include practice questions and answers
              </span>
            </label>
            
            <label className="flex items-center p-3 lg:p-4 rounded-lg hover:bg-white/5 transition-colors duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeVideos}
                onChange={() => handleOptionChange('includeVideos')}
                className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500 focus:ring-blue-400 border-white/30 rounded bg-white/10 focus:bg-white/20"
                disabled={loading}
              />
              <span className="ml-3 lg:ml-4 text-white/90 text-sm lg:text-base">
                Include video recommendations
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 lg:py-4 px-6 lg:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="loading-spinner mr-2 lg:mr-3"></div>
              <span className="text-sm lg:text-base">Generating your study guide...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm lg:text-base font-semibold">Generate Study Guide</span>
            </div>
          )}
        </button>
      </form>

      {loading && (
        <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-blue-500/20 rounded-lg border border-blue-400/30 backdrop-blur-sm">
          <div className="flex items-center text-blue-200">
            <div className="loading-spinner mr-3 lg:mr-4"></div>
            <div>
              <p className="font-medium text-sm lg:text-base">AI is working its magic!</p>
              <p className="text-xs lg:text-sm text-blue-300">This usually takes 10-30 seconds...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InputForm 