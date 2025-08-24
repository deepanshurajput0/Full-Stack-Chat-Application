import axios from 'axios'
import React, { useState } from 'react'


const Login = () => {
  const [user, setUser] = useState({
    email:"",
    password:"",
  })
  
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
          const { name, value } = e.target
            setUser({...user,[name]:value})
  }
   
 async function handleSubmit(e:React.FormEvent){
         e.preventDefault()
        try {
          const res = await axios.post('http://localhost:8000/api/v1/user/login',user,{
            withCredentials:true,
            headers:{
              "Content-Type":"application/json"
            }
          })
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
  }


  return (
    <div className=" flex justify-evenly h-[90vh] items-center">
      <form onSubmit={handleSubmit}>
                 <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">


  <label className="label">Email</label>
  <input type="email" 
  className="input" 
  name='email'
  onChange={handleChange}
  placeholder="Email" />

  <label className="label">Password</label>
  <input 
  type="password" 
  className="input"
  name='password'
  onChange={handleChange} 
  placeholder="Password" />
   
  <button type='submit' className="btn btn-neutral mt-4">Login</button>
</fieldset>
      </form>

    </div>
  )
}

export default Login