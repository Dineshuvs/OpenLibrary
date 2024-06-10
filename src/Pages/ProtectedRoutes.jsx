import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = ({accountVerified}) => {
   
    return accountVerified ? <Outlet /> : <Navigate to="/" />;
    }
    export default ProtectedRoutes;