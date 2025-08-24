import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null as File | null,
  });

  const [preview, setPreview ] = useState<string | null>(null) 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
     if(name === 'profilePic' && files){
       setUser({...user, profilePic:files[0]})
       setPreview(URL.createObjectURL(files[0]))
     }else{
      setUser({...user,[name]:value})
     }
  };
  
  function handleSubmit(){
    console.log(user)
  }

  return (
    <div className=" flex justify-evenly h-[90vh] items-center">
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
          Create Profile
        </button>
      </fieldset>
    </div>
  );
};

export default Register;
