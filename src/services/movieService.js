// src/services/movieService.js

import axios from "axios";

const API_KEY = "3aec63790d50f3b9fc2efb4c15a8cf99";
const BASE_URL = "https://api.themoviedb.org/3";

// Search for a movie by title to get its ID and details
export const searchMovieByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: title,
        language: "en-US",
      },
    });

    return response.data.results[0] || null; // Return first match
  } catch (error) {
    console.error("Error searching for movie:", error);
    return null;
  }
};

// searchMovieByTitle('Nobody 2')

// Get movie videos/trailers by movie ID
export const getMovieVideos = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    // Filter for trailers and teasers from YouTube
    const videos = response.data.results.filter(
      (video) =>
        (video.type === "Trailer" || video.type === "Teaser") &&
        video.site === "YouTube"
    );

    return videos;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
};

// getMovieVideos(1007734)

// Get movie details with videos
export const getMovieWithTrailer = async (title) => {
  try {
    // First search for the movie
    const movie = await searchMovieByTitle(title);
    if (!movie) return null;

    // Then get its videos
    const videos = await getMovieVideos(movie.id);

    return ({
      ...movie,
      videos: videos,
    });
  } catch (error) {
    console.error("Error getting movie with trailer:", error);
    return null;
  }
};

