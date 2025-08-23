import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
function App() {
  
  return (
    <div>
       <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        </Routes> 
    </div>
  )
}

export default App




