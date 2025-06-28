import React from 'react'

const Header = () => {
  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white tracking-tight">EduMate</h1>
              <p className="text-xs lg:text-sm text-white/70">AI Study Guide Generator</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a href="#features" className="text-white/80 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
              Features
            </a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
              About
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors duration-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 