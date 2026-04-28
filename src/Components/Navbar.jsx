import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex border space-x-7 items-center pl-3 py-4 bg-gray-400">
            <i 
                className="fa-solid fa-clapperboard text-white" 
                style={{ fontSize: "40px" }}
            ></i>

            <Link 
                to="/" 
                className="text-blue-500 text-3xl font-bold !no-underline hover:no-underline"
            >
                Movies
            </Link>

            <Link 
                to="/watchList" 
                className="text-blue-500 text-3xl font-bold !no-underline hover:no-underline"
            >
                WatchList
            </Link>
        </div>
    );
};

export default Navbar;