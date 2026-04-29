import Navbar from "./components/Navbar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies.js";
import WatchList from "./components/WatchList.js";
import { useEffect, useState } from "react";
import {MovieContext} from "./components/MovieContext.js";
import MoodSelector from "./components/MoodSelector.js";



function App() {
  const [watchList, setWatchList] = useState([]);

   function handleAddtoWatchList(movieObj) {
    const updated = [...watchList, movieObj];
    setWatchList(updated);
    localStorage.setItem("wlmovies", JSON.stringify(updated));
  }
  function DeleteFromWatchList(movie) {
    const updated = watchList.filter((m) => m.id !== movie.id);
    setWatchList(updated);
    localStorage.setItem("wlmovies", JSON.stringify(updated));
  }
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("wlmovies")) || [];
    setWatchList(movies);
  }, []);

  return (
    <>
     <MovieContext.Provider value={{watchList , handleAddtoWatchList , setWatchList,DeleteFromWatchList}}>
      <div>
        <BrowserRouter>
          <div className="bg-black">
            <Navbar />
          </div>

          <Routes>
            <Route
              path="/"
              element={<Movies  />}
            />
            <Route path="/watchlist" element={<WatchList/> } />
            <Route path="/mood" element={<MoodSelector/> } />

          </Routes>
        </BrowserRouter>
      </div>
      </MovieContext.Provider>
    </>
  );
}

export default App;