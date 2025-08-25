import axios from "axios"
import { useEffect, useState } from "react"

export const useChatUsers =()=>{
    interface User {
        id:number,
        name:string,
        profilePic:string
    }
   const [users, setUsers] = useState<User[]>([])
   const [loading, setLoading] = useState<boolean>(false)
    
  async function fetchUsers (){
    try {
        const res = await axios.get('http://localhost:8000/api/v1/user/users',{
            withCredentials:true
        })
        setUsers(res.data)
    } catch (error) {
       console.log(error)
    }finally{
        setLoading(false)
    }
   }
   
   useEffect(()=>{
      fetchUsers()     
   },[])

   return {
    loading, users
   }
}