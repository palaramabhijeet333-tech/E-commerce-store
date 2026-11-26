import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import ProductDetails from "./components/ProductDetails"
function App() {


  return (
    <>
    <NavBar/>
     <main className="mt-20">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
      </Routes>
     </main>
    </>
  )
}

export default App
