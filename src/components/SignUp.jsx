import { useState,useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const SignUp = () => {
    const [fullName, setFullName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {signUp,loading} = useAuthContext()
    const [submitting, setSubmitting] = useState(false)

    async function handleSumbit(e){
        e.preventDefault()
        setError(null)
        setSubmitting(true)
        try {
            await signUp(fullName,email,password);
            navigate("/")
         
        } catch (e) {
            setError(e.message || "Failed to create account")
        }finally{
            setSubmitting(true)
        }
    }

  return (
    <div className="bg-black min-h-screen w-full flex-center text-white">
        <form onSubmit={handleSumbit} className="form">

            <h2 className="text-white font-bold text-3xl">Sign up</h2>
            <div className="flex flex-col gap-4">

                <input onChange={(e)=>setFullName(e.target.value)} type="text" className="sign-inputs" placeholder="Enter your full name"/>

                <input onChange={(e)=>setemail(e.target.value)} type="email" className="sign-inputs" placeholder="Enter your full email"/>

                <input onChange={(e)=>setpassword(e.target.value)} type="text" className="sign-inputs" placeholder="Enter your full password"/>

            </div>

            <button className="sign-btn">Sign up</button>

            <p className="">Already have an account? <Link to="/login" className="text-blue-400">Login</Link> </p>

            <div className="text-red-500 text-lg">
                {error}
            </div>
        </form>
    </div>
  )
}

export default SignUp