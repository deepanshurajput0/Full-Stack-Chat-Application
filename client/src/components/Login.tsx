import loginImage from './../Images/20250824_0024_Colorful Encryption Scene_simple_compose_01k3c4fd57evgakt5mpw6s4gq6.png'

const Login = () => {
  return (
    <div className=" flex justify-evenly h-[90vh] items-center">
        <div>
            <img className=' h-[40rem]' src={loginImage} alt='img' />
        </div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" />

  <button className="btn btn-neutral mt-4">Login</button>
</fieldset>
    </div>
  )
}

export default Login