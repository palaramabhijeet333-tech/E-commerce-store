import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
function App() {


  return (
    <>
    <NavBar/>
     <main className="mt-20">
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
     </main>
    </>
  )
}

export default App
