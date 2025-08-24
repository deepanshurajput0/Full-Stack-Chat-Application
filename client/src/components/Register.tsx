import React, { useState } from "react";
import axios from 'axios'
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null as File | null,
  });

  const [preview, setPreview ] = useState<string | null>(null) 
  const [loading, setLoading] = useState<boolean>(false)
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
     if(name === 'profilePic' && files){
       setUser({...user, profilePic:files[0]})
       setPreview(URL.createObjectURL(files[0]))
     }else{
      setUser({...user,[name]:value})
     }
  };
  
  async function handleSubmit(){
    setLoading(true)
    const data = new FormData()
    data.append('name',user.name)
    data.append('email',user.email)
    data.append('password',user.password) 
    if(user.profilePic){
      data.append('profilePic',user.profilePic)
    }
    try {
       const res = await axios.post('http://localhost:8000/api/v1/user/register',data,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
       })
        console.log("Success",res.data)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className=" flex justify-evenly h-[90vh] items-center">
     <form onSubmit={handleSubmit} action="">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <div className="avatar flex justify-center">
          <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring-2 ring-offset-2">
            {
              preview &&  <img
              className=""
              src={preview}
            />
            }
          </div>
        </div>
        <label className="label">Name</label>
        <input type="text"
        name="name" 
        className="input"
        onChange={handleChange} 
        placeholder="Name" />

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input"
          onChange={handleChange}
          placeholder="Password"
        />

        <label className="label">Profile Pic</label>
        <input 
        type="file" 
        name="profilePic"
        onChange={handleChange} 
        className="file-input" />
        <button onClick={handleSubmit}  className="btn btn-neutral mt-4">
          {
            loading ? <span className="loading loading-spinner loading-xs"></span> :   "Create Profile"
          }
        
        </button>
      </fieldset>
     </form>
    </div>
  );
};

export default Register;
