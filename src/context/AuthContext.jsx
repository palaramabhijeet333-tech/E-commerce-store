import { createContext,useContext,useState,useEffect } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

    export const useAuthContext = ()=>{
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children})=>{
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)

    // Sign up 
    async function signUp(fullName,email,password) {
        const {data,error} = await supabase.auth.signUp({
            email,
            password,
        });
        if(error) throw error

        if(data.user){
            const {error:profileError} = await supabase.from("profiles").insert({
                id:data.user.id,
                email:email,
                full_name:fullName,
                role:'customer',
            });
            if(profileError) throw profileError
        }
        return data
    }

    // Login
    async function logIn(email,password) {
        const {data,error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if(error) throw error
        return data
    }
    
    // Signout
    async function signOut() {
        const {error} = await supabase.auth.signOut();
        if(error) throw error
    }

    useEffect(()=>{
        const {data:{subscription}} = supabase.auth.onAuthStateChange(
            async (_event,session) =>{
                const currentUser = session?.user || null;
                setUser(currentUser)
                if(currentUser){
                    const {data} = await supabase.from("profiles").select("*").eq("id",currentUser.id).single()
                    setProfile(data || null)
                }else{
                    setProfile(null)
                }
                setLoading(false);
            }
        )
        return ()=> subscription.unsubscribe()
    },[])


    return(
        <AuthContext.Provider value={{
             signUp,
            logIn,
            signOut,
            user,
            profile,
            isAdmin:profile?.role === "admin",
            loading,
            setLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
    
}
