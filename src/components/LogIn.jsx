import { useState,useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const LogIn = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const {logIn} = useAuthContext()

    async function handleSumbit(e){
        e.preventDefault()
        seterror(null)
        setSubmitting(false)

        try {
            await logIn(email,password)
            navigate("/")
            
        } catch (e) {
            seterror(e.message || "Error while login")
        }finally{
            setSubmitting(false)
        }
    }

  return (
    <div className="bg-black min-h-screen w-full flex-center text-white">
        <form onSubmit={handleSumbit} className="form">

            <h2 className="text-white font-bold text-3xl">Login</h2>

            <div className="flex flex-col items-center gap-4">
               
                <input onChange={(e)=>setemail(e.target.value)} type="email" className="sign-inputs" placeholder="Enter your full email"/>

                <input onChange={(e)=>setpassword(e.target.value)} type="text" className="sign-inputs" placeholder="Enter your full password"/>

            </div>
            <button className=" sign-btn">Login</button>
            
            <p className="">create an account <Link to="/signup" className="text-blue-400">Sign up</Link> </p>
        </form>
    </div>
  )
}

export default LogIn