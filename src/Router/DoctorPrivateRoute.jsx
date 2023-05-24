import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated , userInfo } from "../utils/auth";

const UserPrivateRoute = () => {
  const {userRole} = userInfo();
  if (isAuthenticated() && (userRole === "xray_dr" ||  userRole === "ecg_dr") ) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserPrivateRoute;
