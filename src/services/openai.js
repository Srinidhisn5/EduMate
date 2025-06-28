// OpenAI API Service
// Replace the mock API in App.jsx with this service

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export const generateStudyGuideWithAI = async (topic, options) => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file.')
    }

    const prompt = `Create a comprehensive study guide for "${topic}". 

Please structure the response as a JSON object with the following format:
{
  "topic": "${topic}",
  "summary": "Detailed study guide content with markdown formatting...",
  "practiceQuestions": [
    {
      "question": "Question text here",
      "answer": "Detailed answer here"
    }
  ],
  "videoRecommendations": [
    {
      "title": "Video title",
      "url": "https://www.youtube.com/watch?v=example",
      "duration": "15:30",
      "description": "Brief description of the video"
    }
  ]
}

Include:
- A comprehensive summary with key concepts, important points, study tips, and common mistakes to avoid
- ${options.includePracticeQuestions ? '3-5 practice questions with detailed answers' : 'No practice questions'}
- ${options.includeVideos ? '3 video recommendations with realistic YouTube URLs' : 'No video recommendations'}

Make the content educational, engaging, and suitable for students.`

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content creator. Create comprehensive study guides with summaries, practice questions, and learning tips. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 3000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Try to parse JSON response
    try {
      const parsedContent = JSON.parse(content)
      return {
        ...parsedContent,
        includePracticeQuestions: options.includePracticeQuestions,
        includeVideos: options.includeVideos
      }
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      return {
        topic: topic,
        summary: content,
        practiceQuestions: options.includePracticeQuestions ? [
          {
            question: `What are the key concepts of ${topic}?`,
            answer: `The key concepts include understanding the fundamental principles, practical applications, and systematic approaches to learning this topic effectively.`
          }
        ] : [],
        videoRecommendations: options.includeVideos ? [
          {
            title: `Complete ${topic} Tutorial`,
            url: 'https://www.youtube.com/watch?v=example',
            duration: '15:30',
            description: 'A comprehensive introduction to this topic'
          }
        ] : [],
        includePracticeQuestions: options.includePracticeQuestions,
        includeVideos: options.includeVideos
      }
    }

  } catch (error) {
    console.error('Error generating study guide:', error)
    throw error
  }
}

// Rate limiting utility
export const rateLimiter = {
  lastCall: 0,
  minInterval: 1000, // 1 second between calls

  async throttle() {
    const now = Date.now()
    const timeSinceLastCall = now - this.lastCall
    
    if (timeSinceLastCall < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minInterval - timeSinceLastCall)
      )
    }
    
    this.lastCall = Date.now()
  }
} 