// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavBar() {
  return (
    <nav className="w-full bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-3">
        <img className="w-[50px] h-[50px] object-contain" src={logo} alt="Logo" />
        <h1 className="text-white font-bold text-xl">MovieHub</h1>
      </div>

      {/* Right Section: Links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          Movies
        </Link>
        <Link
          to="/watchlist"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          Watchlist
        </Link>

        <Link
          to="/mood"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
         Mood Selector
        </Link>

     
        
      </div>
    </nav>
  );
}

export default NavBar;