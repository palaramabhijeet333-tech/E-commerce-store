import { Link,useNavigate,useSearchParams } from "react-router-dom"
import { useState,useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search" )|| "");
    const navigate = useNavigate();
    const {user,profile,signOut,loading,isAdmin} = useAuthContext()

    useEffect(()=>{
        setSearchQuery(searchParams.get("search" )|| "")
    },[searchParams]);

    function handleSearch(e){
        e.preventDefault();
        if(searchQuery.trim()){
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
        }else{
            navigate("/")
        }
    }

    async function  handleSignOut() {
        await signOut();
        navigate("/")
    }

  return (
    <nav className="fixed z-50 h-16 w-full inset-x-0 top-0  bg-white flex justify-around items-center shadow-md">
        <Link to={"/"} className="text-3xl font-bold text-vibrantOrange">
        Logo
        </Link>
        <form onSubmit={handleSearch} className="  rounded-xl w-1/2  flex">
            <input type="text" 
            className="w-full p-2 border border-black  rounded-l-2xl"
            placeholder="Search for any item."
            onChange={(e)=>setSearchQuery(e.target.value)}
            value={searchQuery}
            
            />
            <button className="bg-black rounded-r-xl py-2 px-5 text-white">
                Search
            </button>
        </form>
        <div className="flex gap-5">
            {!loading &&(
                user ? (
                    <div className="flex gap-3 items-center">
                        {
                            isAdmin && (
                                <Link to="/admin" className="">Admin</Link>
                            )
                        }
                        <p className="font-bold text-lg">Hi,{profile?.full_name || user.email }</p>
                        <button className="bg-black text-white rounded-xl p-2" onClick={handleSignOut}>Logout</button>
                    </div>
                ) :<Link to={"/signup"} className="bg-black text-white rounded-xl p-2">
                Login/Signup
            </Link>
            )}

            <Link to={"/cart"} className="bg-gray-600 rounded-full p-2">
                🛒
            </Link>
        </div>
    </nav>
  )
}

export default NavBar