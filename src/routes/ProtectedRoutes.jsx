//create a protected route component
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//use outlet to render child components
import {Outlet}  from "react-router-dom";

const ProtectedRoutes = () => {

    const token = useSelector((state) => state.seller.token);
    console.log("token in protected route:", token);

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;