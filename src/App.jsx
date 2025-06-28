import React, { useState } from 'react'
import InputForm from './components/InputForm'
import StudyGuideOutput from './components/StudyGuideOutput'
import Header from './components/Header'
import Footer from './components/Footer'
import { generateStudyGuideWithHF } from './services/huggingface'
import { generateStudyGuideFromWikipedia } from './services/wikipedia'
import { BeamsBackground } from './components/ui/beams-background'

function App() {
  const [studyGuide, setStudyGuide] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [aiSource, setAiSource] = useState('huggingface') // Changed from 'mock' to 'huggingface'

  const generateStudyGuide = async (topic, options) => {
    setLoading(true)
    setError(null)
    
    console.log('🚀 Starting study guide generation...')
    console.log('📝 Topic:', topic)
    console.log('⚙️ Options:', options)
    console.log('🤖 AI Source:', aiSource)
    
    try {
      let response = null

      // Choose AI source based on user preference
      switch (aiSource) {
        case 'huggingface':
          console.log('🔗 Calling Hugging Face API...')
          response = await generateStudyGuideWithHF(topic, options)
          console.log('✅ Hugging Face response received:', response)
          break
        case 'wikipedia':
          console.log('📚 Calling Wikipedia API...')
          response = await generateStudyGuideFromWikipedia(topic, options)
          if (!response) {
            console.log('⚠️ Wikipedia failed, falling back to Hugging Face...')
            // Fallback to Hugging Face if Wikipedia fails
            response = await generateStudyGuideWithHF(topic, options)
          }
          break
        default:
          console.log('🎭 Using mock API...')
          // Mock API (default)
          response = await simulateOpenAIAPI(topic, options)
      }

      console.log('📋 Final response:', response)
      setStudyGuide(response)
    } catch (err) {
      console.error('❌ Error in generateStudyGuide:', err)
      setError('Failed to generate study guide. Please try again.')
      console.error('Error generating study guide:', err)
    } finally {
      setLoading(false)
    }
  }

  const simulateOpenAIAPI = async (topic, options) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Enhanced mock response with more detailed topic-specific information
    const mockStudyGuide = {
      topic: topic,
      summary: `Here's a comprehensive study guide for ${topic}:

## Key Concepts
- **Core Principle 1**: Understanding the fundamental concepts of ${topic}
- **Core Principle 2**: Application of ${topic} in real-world scenarios
- **Core Principle 3**: Advanced techniques and methodologies

## Historical Context
${topic} has evolved over time, with significant developments in understanding and application. The field continues to grow and adapt to new challenges and discoveries.

## Real-world Applications
${topic} is applied in various industries and everyday situations. Understanding these applications helps reinforce theoretical knowledge and shows the practical value of learning this subject.

## Important Points to Remember
1. Always start with the basics before moving to complex topics
2. Practice regularly to reinforce your understanding
3. Connect theoretical knowledge with practical applications
4. Review and revise periodically to maintain retention

## Study Tips
- Create mind maps to visualize connections between concepts
- Use the Feynman Technique: explain concepts in simple terms
- Practice with real examples and case studies
- Form study groups to discuss and clarify doubts

## Common Mistakes to Avoid
- Rushing through topics without proper understanding
- Memorizing without comprehension
- Ignoring practical applications
- Not reviewing regularly

## Related Topics
${topic} connects to various other subjects and fields. Understanding these relationships helps build a comprehensive knowledge base.`,
      
      practiceQuestions: [
        {
          question: `What are the fundamental principles of ${topic}?`,
          answer: `The fundamental principles of ${topic} include understanding core concepts, practical applications, and systematic approaches to problem-solving. These principles form the foundation for advanced learning in this field.`
        },
        {
          question: `How can you apply ${topic} in real-world scenarios?`,
          answer: `You can apply ${topic} by identifying relevant patterns, using systematic approaches, and adapting concepts to specific situations. Real-world application helps reinforce theoretical knowledge and demonstrates practical value.`
        },
        {
          question: `What are the most common challenges when learning ${topic}?`,
          answer: `Common challenges include grasping abstract concepts, connecting theory to practice, maintaining consistent study habits, and overcoming initial complexity. These challenges are normal and can be overcome with proper strategies.`
        }
      ],
      
      videoRecommendations: [
        {
          title: `Complete ${topic} Tutorial for Beginners`,
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' tutorial')}`,
          duration: '15:30',
          description: 'A comprehensive introduction to the basics of this topic'
        },
        {
          title: `${topic} Advanced Concepts Explained`,
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' advanced')}`,
          duration: '22:15',
          description: 'Deep dive into advanced concepts and applications'
        },
        {
          title: `${topic} Practice Problems and Solutions`,
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' practice problems')}`,
          duration: '18:45',
          description: 'Hands-on practice with real-world examples'
        }
      ],
      
      includePracticeQuestions: options.includePracticeQuestions,
      includeVideos: options.includeVideos
    }
    
    return mockStudyGuide
  }

  return (
    <BeamsBackground intensity="medium">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl lg:max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 tracking-tight">
              AI-Powered Study Guide Generator
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Enter any subject or topic, and get a personalized study guide with summaries, 
              practice questions, and video recommendations powered by AI.
            </p>
          </div>

          {/* AI Source Selection */}
          <div className="card mb-6 lg:mb-8 backdrop-blur-sm bg-white/10 border border-white/20">
            <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6">Choose AI Source:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              <label className="flex items-center p-3 lg:p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                <input
                  type="radio"
                  name="aiSource"
                  value="mock"
                  checked={aiSource === 'mock'}
                  onChange={(e) => setAiSource(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-white">Demo Mode</div>
                  <div className="text-sm text-white/70">Fast mock responses</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 lg:p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                <input
                  type="radio"
                  name="aiSource"
                  value="wikipedia"
                  checked={aiSource === 'wikipedia'}
                  onChange={(e) => setAiSource(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-white">Wikipedia</div>
                  <div className="text-sm text-white/70">Factual, detailed info</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 lg:p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                <input
                  type="radio"
                  name="aiSource"
                  value="huggingface"
                  checked={aiSource === 'huggingface'}
                  onChange={(e) => setAiSource(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium text-white">Hugging Face</div>
                  <div className="text-sm text-white/70">AI-generated content</div>
                </div>
              </label>
            </div>
            
            {aiSource === 'huggingface' && (
              <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <p className="text-sm lg:text-base text-blue-200">
                  💡 <strong>Tip:</strong> Get a free Hugging Face API token from{' '}
                  <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-100 transition-colors">
                    huggingface.co/settings/tokens
                  </a>{' '}
                  and add it to your .env file as VITE_HF_API_TOKEN
                </p>
              </div>
            )}
          </div>

          <InputForm onGenerate={generateStudyGuide} loading={loading} />
          
          {error && (
            <div className="card mt-6 lg:mt-8 border-red-400/30 bg-red-500/20 backdrop-blur-sm">
              <div className="flex items-center text-red-200">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm lg:text-base">{error}</span>
              </div>
            </div>
          )}

          {studyGuide && (
            <StudyGuideOutput studyGuide={studyGuide} />
          )}

          {/* Features Section */}
          <section id="features" className="mt-16 lg:mt-20">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                Features
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Everything you need to create comprehensive study guides
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 lg:mb-6">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">AI-Powered Generation</h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Advanced AI models create personalized study guides tailored to your learning needs and preferences.
                </p>
              </div>

              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 lg:mb-6">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Practice Questions</h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Test your knowledge with AI-generated practice questions and detailed explanations.
                </p>
              </div>

              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 lg:mb-6">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Video Recommendations</h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Curated video content to supplement your learning with visual explanations and tutorials.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="mt-16 lg:mt-20">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                How It Works
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Simple steps to create your personalized study guide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <span className="text-2xl lg:text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Enter Your Topic</h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Type any subject, topic, or concept you want to study
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <span className="text-2xl lg:text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Choose AI Source</h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Select from Demo Mode, Wikipedia, or Hugging Face AI
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <span className="text-2xl lg:text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Get Your Guide</h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Receive a comprehensive study guide with summaries, questions, and videos
                </p>
              </div>
            </div>
          </section>

          {/* Examples Section */}
          <section id="examples" className="mt-16 lg:mt-20">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                Examples
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                See what kind of study guides you can create
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Programming</h3>
                <p className="text-white/80 text-sm lg:text-base mb-4">
                  JavaScript, Python, React, Data Structures & Algorithms
                </p>
                <div className="text-xs text-white/60">
                  Includes: Core concepts, syntax examples, best practices, debugging tips
                </div>
              </div>

              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Science</h3>
                <p className="text-white/80 text-sm lg:text-base mb-4">
                  Physics, Chemistry, Biology, Mathematics
                </p>
                <div className="text-xs text-white/60">
                  Includes: Theories, formulas, experiments, real-world applications
                </div>
              </div>

              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Languages</h3>
                <p className="text-white/80 text-sm lg:text-base mb-4">
                  English, Spanish, French, Grammar & Vocabulary
                </p>
                <div className="text-xs text-white/60">
                  Includes: Grammar rules, vocabulary lists, pronunciation guides
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mt-16 lg:mt-20">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-6 lg:space-y-8">
              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">
                  How accurate are the AI-generated study guides?
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Our AI models are trained on vast amounts of educational content and provide accurate, up-to-date information. However, we recommend cross-referencing with official sources for critical academic work.
                </p>
              </div>

              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">
                  Can I use this for any subject?
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Yes! EduMate works with virtually any subject or topic, from academic subjects to professional skills and hobbies.
                </p>
              </div>

              <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8">
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">
                  Is my data secure?
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Absolutely. We don't store your study topics or generated content. All processing happens securely and your privacy is protected.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mt-16 lg:mt-20">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                Contact Us
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                Have questions or feedback? We'd love to hear from you!
              </p>
            </div>
            
            <div className="card backdrop-blur-sm bg-white/10 border border-white/20 p-6 lg:p-8 max-w-2xl mx-auto">
              <div className="text-center mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">Srinidhi SN</h3>
                <p className="text-white/80 text-sm lg:text-base">Computer Science Enthusiast | Project Developer</p>
              </div>
              
              <div className="space-y-6 lg:space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <a href="mailto:srinidhisnnairy@gmail.com" className="text-white/80 hover:text-white transition-colors">
                      srinidhisnnairy@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Phone</h3>
                    <a href="tel:+918105506208" className="text-white/80 hover:text-white transition-colors">
                      +91 8105506208
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">GitHub</h3>
                    <a href="https://github.com/Srinidhisn5" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      github.com/Srinidhisn5
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Portfolio</h3>
                    <a href="https://github.com/Srinidhisn5" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                      View my projects on GitHub
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-white/20">
                <p className="text-center text-white/60 text-sm lg:text-base">
                  👋 Hi, I'm Srinidhi SN - A Computer Science Enthusiast passionate about building innovative projects and always learning & exploring new technologies.
                </p>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </BeamsBackground>
  )
}

export default App 