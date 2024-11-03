import { Navigate, Outlet } from "react-router-dom";
import { API_TOKEN } from "./constants";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem(API_TOKEN);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; 
  // return <Outlet />;
};

export default PrivateRoute;
