import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

// Starting at 11PM

// https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage , setMaxPage] = useState(null)

  function pageNext() {
    if(page<maxPage){
    setPage(page + 1);
    }
    
  }

  function pagePrevious() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=${page}`
      );

      setMovies(response.data.results);
      setMaxPage(response.data.total_pages)
    }

    fetchMovies();
  }, [page]);

  console.log(movies);

  return (
    <div>
      <Banner />
      <div className="text-2xl font-bold text-center m-5">
        <h1>Trending Movies</h1>
      </div>
      <div className="flex flex-wrap gap-8 m-8">
        {movies &&
          movies.map((movie) => (
            <MovieCard
              movieObject={movie}
             
            />
          ))}
      </div>
      <Pagination prevFn={pagePrevious} nextFn={pageNext} pageNo={page} />
    </div>
  );
}

export default Movies;