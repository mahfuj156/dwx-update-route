import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated , userInfo } from "../utils/auth";

const PrivateRoute = () => {
  const {userRole} = userInfo();
  if (isAuthenticated()) {
    return <Outlet />;
  }  else {
    //   if (isAuthenticated() && userRole === "admin") {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
