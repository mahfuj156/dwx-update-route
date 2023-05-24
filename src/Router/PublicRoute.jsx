import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PublicRoute = () => {
  if (!isAuthenticated()) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRoute;
