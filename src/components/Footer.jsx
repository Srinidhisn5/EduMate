import React from 'react'

const Footer = () => {
  return (
    <footer className="backdrop-blur-md bg-white/5 border-t border-white/20 mt-16 lg:mt-20">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4 lg:mb-6">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white">EduMate</h3>
                <p className="text-sm text-white/70">AI Study Guide Generator</p>
              </div>
            </div>
            <p className="text-white/80 text-sm lg:text-base leading-relaxed">
              Transform your learning experience with AI-powered personalized study guides. 
              Get comprehensive summaries, practice questions, and video recommendations for any subject.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6">Quick Links</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a href="#features" className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#examples" className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
                  Examples
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6">Connect</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a href="#contact" className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#feedback" className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-white/70 hover:text-white transition-colors duration-200 text-sm lg:text-base font-medium">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 lg:mt-12 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-white/60 text-sm lg:text-base">
            © 2024 EduMate. All rights reserved. Made with ❤️ for students everywhere.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/Srinidhisn5" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#twitter" className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#linkedin" className="text-white/60 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 