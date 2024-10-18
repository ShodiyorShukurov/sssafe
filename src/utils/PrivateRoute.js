import { Navigate, Outlet } from "react-router-dom";
import { API_LOGIN, API_PASSWORD } from "./constants";

const PrivateRoute = () => {
  const isAuthenticated =
    localStorage.getItem(API_LOGIN) === "admin" &&
    localStorage.getItem(API_PASSWORD) === "12563Aas@";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
