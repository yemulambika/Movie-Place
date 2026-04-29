import React, { useState } from 'react';
import { getMoodBasedRecommendations } from '../config/gemini.js';
import { moods } from '../utlity/moods.js';

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    console.log(mood)
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const result = await getMoodBasedRecommendations(mood);
      setMovies(result.recommendations || []);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetMood = () => {
    setSelectedMood(null);
    setMovies([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎭 Mood-Based Movies
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your mood and discover perfect movies
          </p>
        </div>

        {/* Mood Selection */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodClick(mood)}
                disabled={loading}
                className={`
                  p-6 rounded-lg transition-all duration-200 border-2 text-center
                  ${selectedMood?.id === mood.id 
                    ? `${mood.color} border-gray-800 shadow-lg text-white` 
                    : 'bg-white border-gray-300 hover:bg-gray-50 hover:shadow-md hover:border-gray-400'
                  }
                  ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                `}
              >
                <div className="text-4xl mb-3">{mood.emoji}</div>
                <div className="font-semibold mb-2">{mood.name}</div>
                <div className="text-sm opacity-90">{mood.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-md">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
              <span className="text-lg font-medium text-gray-700">
                Finding {selectedMood?.name} movies...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-600 font-medium mb-2">Oops! Something went wrong</div>
              <p className="text-red-500 text-sm mb-4">{error}</p>
              <button
                onClick={() => selectedMood && handleMoodClick(selectedMood)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Movie Results */}
        {movies.length > 0 && !loading && (
          <div>
            {/* Results Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md border">
                <span className="text-2xl mr-3">{selectedMood?.emoji}</span>
                <span className="font-semibold text-gray-700">
                  Perfect for your {selectedMood?.name} mood
                </span>
              </div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {movies.map((movie, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
                >
                  {/* Movie Info */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-800 flex-1 pr-2">
                        {movie.title}
                      </h3>
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap
                        ${movie.confidence >= 90 ? 'bg-green-100 text-green-800' :
                          movie.confidence >= 75 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-600'}
                      `}>
                        {movie.confidence}%
                      </span>
                    </div>
                    
                    {movie.year && (
                      <p className="text-sm text-gray-500 mb-2">{movie.year}</p>
                    )}
                    
                    {movie.genre && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                        {movie.genre}
                      </span>
                    )}
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {movie.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Try Different Mood Button */}
            <div className="text-center">
              <button
                onClick={resetMood}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Try Different Mood
              </button>
            </div>
          </div>
        )}

        {/* Empty State (when no mood selected) */}
        {!selectedMood && movies.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Select your mood above
            </h3>
            <p className="text-gray-500">
              Click on any mood to get instant movie recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSelector;