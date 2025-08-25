import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast';
import Register from './components/Register'
import { useAuth } from './hooks/auth';
import PrivateRoute from './components/PrivateRoute';
import { Navigate } from "react-router-dom";
function App() {
  const { user } = useAuth()
  console.log(user)
  return (
    <div>
       <Routes>
        <Route path='/register' element={
         !user ? <Register/> : <Navigate to={'/'} />
        } />
        <Route path='/login' element={
         !user ? <Login/> : <Navigate to={'/'} />
        } />
        </Routes> 
        <Toaster/>
    </div>
  )
}

export default App




