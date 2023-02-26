import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({userLogged}){
    return userLogged !== null ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute