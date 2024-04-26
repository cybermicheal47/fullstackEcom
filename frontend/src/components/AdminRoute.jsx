import React from "react";
import { Outlet, Navigate } from "react-router-dom"; //outlet will return whatever page we are trying to load if we are authenticated
//while navigate will redirect non-auth users
import { useSelector } from "react-redux";
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="login" replace />
  );
};

export default AdminRoute;
