import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MovieContext } from "./MovieContext.jsx";

function Banner() {

  const [url, setUrl] = useState(null)
  const { handleAddtoWatchList } = useContext(MovieContext);

  const imageurls = ['https://image.tmdb.org/t/p/original/1BpjcVIztlsk0mym7OLF6CW97eh.jpg',
    'https://image.tmdb.org/t/p/original/zxi6WQPVc0uQAG5TtLsKvxYHApC.jpg',
    'https://image.tmdb.org/t/p/original/28zX1DO1NJWeS1e573lSJQ9kiVh.jpg',]

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageurls.length);
    setUrl(imageurls[randomIndex]);
  }, []);

  return (
    <div
  className="relative h-[70vh] bg-cover bg-center flex items-center"
  style={{
    backgroundImage: `url(${url})`,
  }}
>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 px-10 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          X-Men:Apocalypse
        </h1>
        <p className="text-gray-300 mt-4 text-lg md:text-xl">
          A short description of the movie goes here. Keep it engaging and concise
          so users want to click play.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => alert("Play trailer here or redirect to player")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold shadow-md transition"
          >
            ▶ Watch Now
          </button>
          <button
            onClick={() =>
  handleAddtoWatchList({
    id: Date.now(),
    title: "X-Men: Apocalypse",
    poster_path: url,
    genre_ids: [28], // give valid genre id (action)
    vote_average: 7.5,
    popularity: 100,
  })
}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-semibold shadow-md transition"
          >
            + Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;