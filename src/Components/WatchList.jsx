import { useEffect, useState } from "react";
import genreid from '../Utility/genre';

function WatchList({ watchList, handleRemoveMovie, setWatchlist }) {

    const [search, setSearch] = useState('');
    const [genres, setGenres] = useState(['All Genres']);
    const [currGenre, setCurrGenre] = useState('All Genres');

    // 🔍 Search
    let handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // 🎯 Genre filter
    let handleFilter = (genre) => {
        setCurrGenre(genre);
    };

    // 🔼 Sort Increasing
    let increaseSort = () => {
        let sorted = [...watchList].sort((a, b) => a.vote_average - b.vote_average);
        setWatchlist(sorted);
    };

    // 🔽 Sort Decreasing
    let decreaseSort = () => {
        let sorted = [...watchList].sort((a, b) => b.vote_average - a.vote_average);
        setWatchlist(sorted);
    };

    // 🎬 Extract genres
    useEffect(() => {
        let temp = watchList.map((movieObj) => genreid[movieObj.genre_ids[0]]);
        temp = [...new Set(temp)]; // remove duplicates
        setGenres(['All Genres', ...temp]);
    }, [watchList]);

    return (
        <>
            {/* 🎯 Genre Buttons */}
            <div className="flex justify-center flex-wrap m-4">
                {genres.map((genre) => (
                    <div
                        key={genre}
                        onClick={() => handleFilter(genre)}
                        className={
                            currGenre === genre
                                ? "m-4 flex justify-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl items-center text-white font-bold cursor-pointer"
                                : "m-4 flex justify-center h-[3rem] w-[9rem] bg-gray-400 rounded-xl items-center text-white font-bold cursor-pointer"
                        }
                    >
                        {genre}
                    </div>
                ))}
            </div>

            {/* 🔍 Search */}
            <div className="flex justify-center my-4">
                <input
                    onChange={handleSearch}
                    value={search}
                    type="text"
                    placeholder="Search for Movies"
                    className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-2"
                />
            </div>

            {/* 📊 Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
                <table className="w-full text-gray-500 text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>
                                <div className="flex justify-center">
                                    <div onClick={increaseSort} className="p-2 cursor-pointer">⬆️</div>
                                    <div className="p-2">Ratings</div>
                                    <div onClick={decreaseSort} className="p-2 cursor-pointer">⬇️</div>
                                </div>
                            </th>
                            <th>Popularity</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {watchList
                            .filter((movieObj) => {
                                // 🔍 Search filter
                                let matchesSearch = movieObj.title
                                    .toLowerCase()
                                    .includes(search.toLowerCase());

                                // 🎯 Genre filter
                                let matchesGenre =
                                    currGenre === "All Genres" ||
                                    genreid[movieObj.genre_ids[0]] === currGenre;

                                return matchesSearch && matchesGenre;
                            })
                            .map((movieObj) => (
                                <tr key={movieObj.id} className="border-b-2">

                                    <td className="flex items-center px-4 py-2">
                                        <img
                                            className="h-[6rem] w-[10rem]"
                                            src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                                        />
                                        <span className="mx-8">
                                            {movieObj.original_title}
                                        </span>
                                    </td>

                                    <td>{movieObj.vote_average}</td>
                                    <td>{movieObj.popularity}</td>
                                    <td>{genreid[movieObj.genre_ids[0]]}</td>

                                    <td
                                        onClick={() => handleRemoveMovie(movieObj)}
                                        className="text-red-800 cursor-pointer"
                                    >
                                        Delete
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default WatchList;