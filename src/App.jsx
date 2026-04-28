import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import WatchList from "./Components/WatchList";
import Banner from "./Components/Banner";
import { useEffect, useState } from "react";
import {BrowserRouter , Routes , Route} from 'react-router-dom';
function App(){
  let [watchList , setWatchlist] = useState([]);

  let handleMovie = (movieObj) => {
  if (!movieObj) return; // 🔴 prevent undefined

  let newWatchList = [...watchList, movieObj];
  localStorage.setItem('moviesApp' , JSON.stringify(newWatchList));
  setWatchlist(newWatchList);
};
  let handleRemoveMovie =(movieObj) =>{
    let filteredList = watchList.filter((movie)=>{
      return movie.id != movieObj.id 
    })
    localStorage.setItem('moviesApp' , JSON.stringify(filteredList));
    setWatchlist(filteredList)
  }

  useEffect(()=>{
    let moviesFromStorage = localStorage.getItem('moviesApp')
    if(!moviesFromStorage){
      return;
    }
    setWatchlist(JSON.parse(moviesFromStorage))
  },[])
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element ={<><Banner/> <Movies watchList={watchList} handleMovie={handleMovie} handleRemoveMovie={handleRemoveMovie}/>  </>}/>
      <Route path="/watchList" element ={<WatchList watchList ={watchList} setWatchlist ={setWatchlist} handleRemoveMovie ={handleRemoveMovie}/>}/>
    </Routes>
    </BrowserRouter>
</>
  )
}
export default App;