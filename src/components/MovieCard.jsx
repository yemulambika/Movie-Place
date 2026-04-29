import React, { useState, useContext } from "react";
import { MovieContext } from "./MovieContext.jsx";

import { Link } from "react-router-dom";
import { getMovieVideos } from '../services/movieService.js';
import TrailerModal from './TrailerModal.jsx';

function MovieCard({ movieObject }) {
  const { watchList, handleAddtoWatchList, DeleteFromWatchList } =
  useContext(MovieContext);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  function doesContain() {
  return watchList?.some((m) => m.id === movieObject.id);
}

  const handleWatchTrailer = async (e) => {
    e.preventDefault(); // Prevent any parent click events
    e.stopPropagation();
    
    setLoadingTrailer(true);
    
    try {
      const videos = await getMovieVideos(movieObject.id);
      
      if (videos.length > 0) {
        setTrailerKey(videos[0].key);
      } else {
        setTrailerKey(null);
      }
      
      setShowTrailer(true);
    } catch (error) {
      console.error('Error fetching trailer:', error);
      setTrailerKey(null);
      setShowTrailer(true);
    } finally {
      setLoadingTrailer(false);
    }
  };

  return (
    <>
      <div
        className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieObject?.poster_path})`,
        }}
      >
        {doesContain(movieObject) ? (
          <div 
            onClick={() => DeleteFromWatchList(movieObject)} 
            className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
          >
            &#10060;
            {/* // code for cross */}
          </div>
        ) : (
          <div
            onClick={() => handleAddtoWatchList(movieObject)}
            className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
          >
            &#128525;
          </div>
        )}

        <div className="text-white w-full text-center text-xl p-2 bg-gray-900/70 rounded-lg">
          {movieObject?.title}
        </div>

        {/* Action Buttons Container */}
        <div className="flex gap-2 mb-2">
          <Link to={`/details/${movieObject?.id}`}>
            <i className="fa-solid fa-circle-info text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"></i>
          </Link>
          
          <button
            onClick={handleWatchTrailer}
            disabled={loadingTrailer}
            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 flex items-center"
            title="Watch Trailer"
          >
            {loadingTrailer ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              "▶️"
            )}
          </button>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerKey={trailerKey}
        movieTitle={movieObject?.title}
      />
    </>
  );
}

export default MovieCard;