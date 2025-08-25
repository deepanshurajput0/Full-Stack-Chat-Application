import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import type { JSX } from "react";


const PrivateRoute =({children}:{children:JSX.Element})=>{
    const { loading, user } = useAuth()
    if(loading) return <div> loading </div>
     return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute