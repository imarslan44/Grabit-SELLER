//create a protected route component

import React, { useState, useEffect }  from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//use outlet to render child components
import {Outlet}  from "react-router-dom";
import { BACKEND_URL } from "../config/env";


const ProtectedRoutes = () => {
 const [isAuthorized, setisAuthorized] = useState("dd");


    const authorize = async ()=>{
        const url = `${BACKEND_URL}/api/seller/authorize/token`
        const res = await fetch(url, {credentials : "include",});
        const data = await res.json();
        setisAuthorized(data.success)
    }
    useEffect(() => {
         authorize()
    }, [])
    
    useEffect(() => {
       console.log(isAuthorized)
    }, [isAuthorized])
    
   

    return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;


