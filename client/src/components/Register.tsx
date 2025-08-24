
const Register = () => {
  return (
        <div className=" flex justify-evenly h-[90vh] items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
       <div className="avatar flex justify-center">
  <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring-2 ring-offset-2">
    <img className="" src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
  </div>
</div>
      <label className="label">Name</label>
  <input type="text" className="input" placeholder="Name" />
  
  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" />

   <label className="label">Profile Pic</label>
     <input type="file" className="file-input" />
  <button className="btn btn-neutral mt-4">Login</button>
</fieldset>
    </div>
  )
}

export default Register



