// Hugging Face API Service
// Provides detailed topic information using free Hugging Face models

const HF_API_URL = 'https://api-inference.huggingface.co/models'

// Free models for different tasks - using more reliable models
const MODELS = {
  // Text generation - using a more reliable model
  TEXT_GENERATION: 'microsoft/DialoGPT-medium',
  // Question answering
  QA: 'deepset/roberta-base-squad2',
  // Text summarization
  SUMMARIZATION: 'facebook/bart-large-cnn',
  // Text classification
  CLASSIFICATION: 'distilbert-base-uncased'
}

export const generateStudyGuideWithHF = async (topic, options) => {
  try {
    // You can get a free API token from https://huggingface.co/settings/tokens
    const apiToken = import.meta.env.VITE_HF_API_TOKEN
    
    if (!apiToken || apiToken === 'your_huggingface_api_token_here') {
      console.warn('❌ No valid Hugging Face API token found. Using fallback method.')
      return generateFallbackStudyGuide(topic, options)
    }

    // Try using a more reliable model for text generation
    const modelUrl = `${HF_API_URL}/${MODELS.TEXT_GENERATION}`

    // Enhanced prompt for better topic-specific information
    const enhancedPrompt = `Create a study guide for ${topic}. Include key concepts, applications, and learning tips.`

    const response = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          max_length: 300,
          temperature: 0.8,
          do_sample: true,
          return_full_text: false,
          pad_token_id: 50256
        }
      })
    })

    if (!response.ok) {
      console.error('❌ Hugging Face API Error:', response.status, response.statusText)
      
      // Try to get error details
      try {
        const errorData = await response.text()
        console.error('❌ Error details:', errorData)
      } catch (e) {
        console.error('❌ Could not read error details')
      }
      
      // If it's a 404, the model might not be available, use fallback
      if (response.status === 404) {
        console.warn('⚠️ Model not found (404). Using fallback method.')
        return generateFallbackStudyGuide(topic, options)
      }
      
      // For other errors, also use fallback
      console.warn('⚠️ API error. Using fallback method.')
      return generateFallbackStudyGuide(topic, options)
    }

    const data = await response.json()
    
    const generatedText = data[0]?.generated_text || data.generated_text || ''

    // Structure the response with proper arrays
    const result = {
      topic: topic,
      summary: formatStudyGuideContent(generatedText, topic),
      practiceQuestions: options.includePracticeQuestions ? 
        generateFallbackQuestions(topic) : [], // Use fallback questions for now
      videoRecommendations: options.includeVideos ? 
        generateVideoRecommendations(topic) : [],
      includePracticeQuestions: options.includePracticeQuestions,
      includeVideos: options.includeVideos
    }

    return result

  } catch (error) {
    console.error('❌ Error with Hugging Face API:', error)
    console.log('🔄 Falling back to default study guide...')
    return generateFallbackStudyGuide(topic, options)
  }
}

// Generate practice questions using QA model
const generatePracticeQuestions = async (topic, apiToken) => {
  try {
    const questions = [
      `What are the fundamental principles of ${topic}?`,
      `How is ${topic} applied in real-world scenarios?`,
      `What are the most important concepts to understand in ${topic}?`,
      `What are common challenges when learning ${topic}?`,
      `How does ${topic} relate to other subjects?`
    ]

    const practiceQuestions = []

    for (const question of questions) {
      const context = `This is about ${topic}. ${topic} is a subject that involves various concepts and applications.`
      
      const response = await fetch(`${HF_API_URL}/${MODELS.QA}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            question: question,
            context: context
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        practiceQuestions.push({
          question: question,
          answer: data.answer || `The answer involves understanding the core concepts of ${topic} and their practical applications.`
        })
      }
    }

    return practiceQuestions
  } catch (error) {
    console.error('Error generating practice questions:', error)
    return generateFallbackQuestions(topic)
  }
}

// Generate video recommendations
const generateVideoRecommendations = async (topic) => {
  // You can integrate with YouTube API here for real video search
  // For now, using curated recommendations based on topic
  const videoTemplates = [
    {
      title: `Complete ${topic} Tutorial for Beginners`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' tutorial')}`,
      duration: '15:30',
      description: `A comprehensive introduction to ${topic} fundamentals`
    },
    {
      title: `${topic} Advanced Concepts Explained`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' advanced')}`,
      duration: '22:15',
      description: `Deep dive into advanced ${topic} concepts`
    },
    {
      title: `${topic} Practice Problems and Solutions`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' practice problems')}`,
      duration: '18:45',
      description: `Hands-on practice with ${topic} examples`
    }
  ]

  return videoTemplates
}

// Format the generated content
const formatStudyGuideContent = (text, topic) => {
  // Clean and structure the generated text
  let formattedText = text.replace(/^.*?${topic}/i, '') // Remove prompt prefix
  
  // Add structure if missing
  if (!formattedText.includes('##')) {
    formattedText = `Here's a comprehensive study guide for ${topic}:

## Key Concepts
${formattedText}

## Important Points to Remember
- Always start with the basics before moving to complex topics
- Practice regularly to reinforce your understanding
- Connect theoretical knowledge with practical applications
- Review and revise periodically to maintain retention

## Study Tips
- Create mind maps to visualize connections between concepts
- Use the Feynman Technique: explain concepts in simple terms
- Practice with real examples and case studies
- Form study groups to discuss and clarify doubts

## Common Mistakes to Avoid
- Rushing through topics without proper understanding
- Memorizing without comprehension
- Ignoring practical applications
- Not reviewing regularly`
  }

  return formattedText
}

// Fallback method when API is not available
const generateFallbackStudyGuide = (topic, options) => {
  console.log('Generating fallback study guide for:', topic)
  
  return {
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
    
    practiceQuestions: options.includePracticeQuestions ? generateFallbackQuestions(topic) : [],
    videoRecommendations: options.includeVideos ? generateVideoRecommendations(topic) : [],
    includePracticeQuestions: options.includePracticeQuestions,
    includeVideos: options.includeVideos
  }
}

const generateFallbackQuestions = (topic) => [
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
] 