// src/utility/moods.js

export const moods = [
  {
    id: 'happy',
    name: 'Happy & Energetic',
    emoji: '😄',
    color: 'bg-yellow-400',
    description: 'Feeling great and want something uplifting',
    genres: ['Comedy', 'Adventure', 'Animation', 'Music'],
    keywords: ['uplifting', 'feel-good', 'energetic', 'fun', 'lighthearted']
  },
  {
    id: 'sad',
    name: 'Melancholic',
    emoji: '😢',
    color: 'bg-blue-400',
    description: 'In a contemplative or emotional mood',
    genres: ['Drama', 'Romance'],
    keywords: ['emotional', 'touching', 'heartfelt', 'deep', 'meaningful']
  },
  {
    id: 'excited',
    name: 'Thrilled & Adventurous',
    emoji: '🤩',
    color: 'bg-orange-400',
    description: 'Want something exciting and action-packed',
    genres: ['Action', 'Adventure', 'Thriller'],
    keywords: ['exciting', 'action-packed', 'thrilling', 'intense', 'adrenaline']
  },
  {
    id: 'relaxed',
    name: 'Chill & Relaxed',
    emoji: '😌',
    color: 'bg-green-400',
    description: 'Want something easy-going and peaceful',
    genres: ['Comedy', 'Romance', 'Family'],
    keywords: ['relaxing', 'easy-going', 'comfortable', 'light', 'peaceful']
  },
  {
    id: 'curious',
    name: 'Curious & Thoughtful',
    emoji: '🤔',
    color: 'bg-purple-400',
    description: 'In the mood for something mind-bending',
    genres: ['Sci-Fi', 'Mystery', 'Documentary'],
    keywords: ['thought-provoking', 'intelligent', 'complex', 'mysterious', 'mind-bending']
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic',
    emoji: '🥺',
    color: 'bg-pink-400',
    description: 'Missing the good old times',
    genres: ['Family', 'Animation', 'Comedy'],
    keywords: ['nostalgic', 'classic', 'childhood', 'retro', 'timeless']
  },
  {
    id: 'scared',
    name: 'Brave & Daring',
    emoji: '😱',
    color: 'bg-red-400',
    description: 'Ready for some thrills and chills',
    genres: ['Horror', 'Thriller'],
    keywords: ['scary', 'suspenseful', 'thrilling', 'dark', 'intense']
  },
  {
    id: 'romantic',
    name: 'Romantic',
    emoji: '💕',
    color: 'bg-rose-400',
    description: 'In the mood for love stories',
    genres: ['Romance', 'Drama'],
    keywords: ['romantic', 'love story', 'heartwarming', 'passionate', 'emotional']
  }
];

export const timePreferences = [
  { id: 'short', name: 'Short (< 90 min)', emoji: '⏰', maxRuntime: 90 },
  { id: 'medium', name: 'Medium (90-150 min)', emoji: '🕐', maxRuntime: 150 },
  { id: 'long', name: 'Long (> 150 min)', emoji: '🕕', minRuntime: 150 },
  { id: 'any', name: 'Any Length', emoji: '🎬', maxRuntime: null }
];