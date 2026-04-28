import MoviesCard from "./MoviesCard";
import axios from "axios";

import { useEffect, useState } from "react";
import Pagination from "./Pagination";
function Movies({handleMovie , handleRemoveMovie , watchList}){
    const[movies , setMovies] = useState([]);
    const[pageNo , setPageno] = useState(1);

     const handleFor=()=>{
        setPageno(pageNo+1);
     }
     const handleBack=()=>{
         if(pageNo == 1){
            setPageno(pageNo);
        }else{
            setPageno(pageNo-1);
        }
     }
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b971d72159bc3868808a6fb913330de6&language=en-US&page=${pageNo}`).then(function(res){
            setMovies(res.data.results);
        })
    },[pageNo])
    return (

        <div className="p-5">
        <div className="text-2xl m-5 font-bold text-center">
            Trending Movies
        </div>
        <div className="flex flex-row flex-wrap justify-around gap-6">
            {movies.map((movieObj)=>{
                return <MoviesCard  movieObj={movieObj}   key = {movieObj.id} poster_path={movieObj.poster_path} name={movieObj.original_title} handleMovie={handleMovie} handleRemoveMovie ={handleRemoveMovie} watchList={watchList} />
            })}
        </div>
        <Pagination pageNo={pageNo} handleBack={handleBack} handleFor={handleFor}/>
        </div>
    )
}
export default Movies;