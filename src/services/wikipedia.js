// Wikipedia API Service
// Fetches detailed, factual information about topics

const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/api/rest_v1'

export const fetchTopicInfoFromWikipedia = async (topic) => {
  try {
    // Search for the topic
    const searchResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(topic)}&format=json&origin=*`
    )
    
    if (!searchResponse.ok) {
      throw new Error('Failed to search Wikipedia')
    }

    const searchData = await searchResponse.json()
    const searchResults = searchData.query?.search || []

    if (searchResults.length === 0) {
      return null
    }

    // Get the first (most relevant) result
    const firstResult = searchResults[0]
    const pageId = firstResult.pageid
    const title = firstResult.title

    // Get detailed page content
    const pageResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&pageids=${pageId}&format=json&origin=*`
    )

    if (!pageResponse.ok) {
      throw new Error('Failed to fetch page content')
    }

    const pageData = await pageResponse.json()
    const page = pageData.query?.pages?.[pageId]

    if (!page) {
      return null
    }

    // Get summary from Wikipedia API
    const summaryResponse = await fetch(
      `${WIKIPEDIA_API_URL}/page/summary/${encodeURIComponent(title)}`
    )

    let summary = null
    if (summaryResponse.ok) {
      const summaryData = await summaryResponse.json()
      summary = summaryData.extract
    }

    return {
      title: page.title,
      extract: page.extract || summary,
      pageId: pageId,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      categories: await fetchCategories(pageId)
    }

  } catch (error) {
    console.error('Error fetching from Wikipedia:', error)
    return null
  }
}

// Fetch categories for the topic
const fetchCategories = async (pageId) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=categories&pageids=${pageId}&format=json&origin=*&cllimit=10`
    )

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    const categories = data.query?.pages?.[pageId]?.categories || []
    
    return categories
      .map(cat => cat.title.replace('Category:', ''))
      .filter(cat => !cat.includes('Wikipedia:') && !cat.includes('Template:'))
      .slice(0, 5)

  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Generate study guide from Wikipedia data
export const generateStudyGuideFromWikipedia = async (topic, options) => {
  const wikiData = await fetchTopicInfoFromWikipedia(topic)
  
  if (!wikiData) {
    return null
  }

  // Structure the Wikipedia content into a study guide
  const studyGuide = {
    topic: topic,
    summary: formatWikipediaContent(wikiData, topic),
    practiceQuestions: options.includePracticeQuestions ? 
      generateQuestionsFromWiki(wikiData, topic) : [],
    videoRecommendations: options.includeVideos ? 
      generateVideoRecommendations(topic) : [],
    includePracticeQuestions: options.includePracticeQuestions,
    includeVideos: options.includeVideos,
    source: {
      name: 'Wikipedia',
      url: wikiData.url,
      title: wikiData.title
    }
  }

  return studyGuide
}

// Format Wikipedia content for study guide
const formatWikipediaContent = (wikiData, topic) => {
  const extract = wikiData.extract || ''
  
  // Split content into sections
  const sentences = extract.split('. ').filter(s => s.trim().length > 10)
  
  let formattedContent = `Here's a comprehensive study guide for ${topic} based on reliable sources:

## Overview
${sentences.slice(0, 3).join('. ')}.

## Key Concepts
${sentences.slice(3, 6).join('. ')}.

## Important Details
${sentences.slice(6, 10).join('. ')}.

## Historical Context
${sentences.slice(10, 15).join('. ')}.

## Applications and Significance
${sentences.slice(15, 20).join('. ')}.

## Study Tips
- Read the full Wikipedia article for complete information
- Focus on understanding the main concepts first
- Look up related topics mentioned in the article
- Practice explaining the concepts in your own words

## Related Topics
${wikiData.categories.slice(0, 3).map(cat => `- ${cat}`).join('\n')}

## Source
This information is sourced from Wikipedia: [${wikiData.title}](${wikiData.url})

*Note: This is a summary. For complete and detailed information, please refer to the original Wikipedia article.*`

  return formattedContent
}

// Generate questions based on Wikipedia content
const generateQuestionsFromWiki = (wikiData, topic) => {
  const extract = wikiData.extract || ''
  const sentences = extract.split('. ').filter(s => s.trim().length > 10)
  
  return [
    {
      question: `What is ${topic} and why is it important?`,
      answer: sentences.slice(0, 2).join('. ') + '.'
    },
    {
      question: `What are the main concepts related to ${topic}?`,
      answer: sentences.slice(2, 4).join('. ') + '.'
    },
    {
      question: `How does ${topic} relate to other fields or subjects?`,
      answer: `Based on the categories and content, ${topic} connects to various related fields including ${wikiData.categories.slice(0, 3).join(', ')}.`
    }
  ]
}

// Generate video recommendations
const generateVideoRecommendations = (topic) => {
  return [
    {
      title: `${topic} - Complete Overview`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' overview')}`,
      duration: '20:00',
      description: `A comprehensive overview of ${topic} concepts and applications`
    },
    {
      title: `${topic} Explained Simply`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' explained')}`,
      duration: '15:30',
      description: `Simple explanations of ${topic} fundamentals`
    },
    {
      title: `${topic} Real-world Examples`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' examples')}`,
      duration: '18:45',
      description: `Practical examples and applications of ${topic}`
    }
  ]
} 