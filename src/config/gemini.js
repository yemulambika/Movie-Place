// src/config/gemini.js - UPDATED WITH SECURITY

import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const getAPIKey = () => {
  
  
  if (!apiKey) {
    throw new Error(
      'Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file'
    );
  }
  
  return apiKey;
};

// Initialize the Gemini AI with secure API key
const genAI = new GoogleGenerativeAI(apiKey);

// Create a reusable model instance
export const getGeminiModel = async () => {
  try {
    return  genAI.getGenerativeModel({ model: "gemini-1.5-pro" });;
  } catch (error) {
    console.error('Failed to initialize Gemini model:', error);
    throw error;
  }
};

// Existing function for watchlist-based recommendations
// export const getMovieRecommendations = async (watchlist) => {
//   try {
//     const model = await getGeminiModel();
    
//     const prompt = `Based on these movies in the user's watchlist: 
//     ${watchlist.map(movie => `- ${movie.title}`).join('\n')}
    
//     Please recommend 5 similar movies. For each movie, provide:
//     - Title
//     - Brief reason why it's recommended
//     - Confidence score (0-100)
    
//     Return the response in this JSON format:
//     {
//       "recommendations": [
//         {
//           "title": "Movie Title",
//           "reason": "Reason for recommendation",
//           "confidence": 85
//         }
//       ]
//     }`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
    
//     // Clean up the response in case it has markdown formatting
//     const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
//     return JSON.parse(cleanedText);
//   } catch (error) {
//     console.error('Error getting recommendations:', error);
//     return { recommendations: [] };
//   }
// };

// NEW function for mood-based recommendations
export const getMoodBasedRecommendations = async (mood) => {
  try {
    const model = await getGeminiModel();
    

    console.log("gemni Fn" , mood)
 

    const prompt = `I'm feeling ${mood.name} today. ${mood.description}

    My mood preferences:
    - Preferred genres: ${mood.genres.join(', ')}
    - Mood keywords: ${mood.keywords.join(', ')}
  

    Please recommend 8 movies that match this mood perfectly. Focus on popular, well-known movies that are easily available. For each movie, provide:
    - Title
    - Year (if known)
    - Brief reason why it matches my mood (1-2 sentences)
    - Confidence score (0-100) based on how well it matches the mood
    - Primary genre

    Return the response in this JSON format:
    {
      "moodSummary": "Brief summary of the mood and recommendation approach",
      "recommendations": [
        {
          "title": "Movie Title",
          "year": 2020,
          "reason": "Reason why it matches your mood",
          "confidence": 92,
          "genre": "Primary Genre"
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response in case it has markdown formatting
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const models = await genAI.listModels();
console.log(models);
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error getting mood-based recommendations:', error);
    return { 
      moodSummary: "Sorry, we couldn't generate recommendations right now.",
      recommendations: [] 
    };
  }
};

// Test function to verify API key works
export const testGeminiConnection = async () => {
  try {
    const model = await getGeminiModel();
    const result = await model.generateContent("Say hello in JSON format");
    const response = await result.response;
    console.log('Gemini connection successful:', response.text());
    return true;
  } catch (error) {
    console.error('Gemini connection failed:', error);
    return false;
  }
};