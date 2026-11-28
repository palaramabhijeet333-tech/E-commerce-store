import { Routes,Route,Outlet } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import ProductDetails from "./components/ProductDetails"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"
const MainLayOut = ()=>{
  return(
    <>
      <NavBar/>
      <main className="pt-16">
        <Outlet/>
      </main>
    </>
  )
}




function App() {


  return (
  
  
   
      <Routes>

        <Route element={<MainLayOut/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        </Route>


        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
      </Routes>
 
  )
}

export default App
