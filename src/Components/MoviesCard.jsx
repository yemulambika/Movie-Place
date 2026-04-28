function MoviesCard({ poster_path, name, handleMovie, movieObj, handleRemoveMovie, watchList }) {
    function doesContain(movieObj) {
    for (let i = 0; i < watchList.length; i++) {
        if (watchList[i] && watchList[i].id === movieObj.id) {
            return true;
        }
    }
    return false;
}
    return (

        <div
            className="relative h-[40vh] w-[160px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
            }}
        >
            {doesContain(movieObj) ?
                (<div onClick={() => (handleRemoveMovie(movieObj))} className="absolute top-2 right-2 flex justify-center items-center h-8 w-8 rounded-lg bg-black/60">
                    &#10060;
                </div>) :
                (<div
  onClick={() => {
    console.log("Clicked!", movieObj);
    handleMovie(movieObj);
  }}
  className="absolute top-2 right-2 flex justify-center items-center h-8 w-8 rounded-lg bg-black/60"
>
  &#128525;
</div>)}
            {/* Emoji - top right */}


            {/* Movie Name - bottom */}
            <div className="absolute bottom-0 w-full text-white p-2 text-center bg-black/70">
                {name}
            </div>

        </div>
    );
}

export default MoviesCard;