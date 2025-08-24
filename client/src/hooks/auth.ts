import axios from "axios";
import { useState, useEffect } from "react";

export const useAuth =()=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    
    async function getCurrentLoggedInUser(){
        setLoading(true)
        try {
          const res = await axios.get("http://localhost:8000/api/v1/user/me",{
            withCredentials:true
          }) 
          console.log(res.data)
          setUser(res.data)  
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

 useEffect(()=>{
    getCurrentLoggedInUser()
 },[])
    return {
       user,loading
    }
}