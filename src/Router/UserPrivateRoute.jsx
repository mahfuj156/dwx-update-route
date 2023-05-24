import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated , userInfo } from "../utils/auth";

const PrivateRoute = () => {
  const {userRole} = userInfo();
  if (isAuthenticated() && userRole === "user") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
