import { Link } from "react-router-dom"
import { useState } from "react";

const NavBar = () => {
    const [searchInput, setSearchInput] = useState("");


  return (
    <nav className="fixed z-50 h-16 w-full inset-x-0 top-0  bg-white flex justify-around items-center shadow-md">
        <Link to={"/"} className="text-3xl font-bold text-vibrantOrange">
        Logo
        </Link>
        <div className="  rounded-xl w-1/2  flex">
            <input type="text" 
            className="w-full p-2 border border-black  rounded-l-2xl"
            placeholder="Search for any item."
            onChange={(e)=>setSearchInput(e.target.value)}
            />
            <button className="bg-black rounded-r-xl py-2 px-5 text-white">
                Search
            </button>
        </div>
        <div className="flex gap-5">
            <button className="bg-black text-white rounded-xl p-2">
                Login/Signup
            </button>

            <button className="bg-gray-600 rounded-full p-2">
                🛒
            </button>
        </div>
    </nav>
  )
}

export default NavBar