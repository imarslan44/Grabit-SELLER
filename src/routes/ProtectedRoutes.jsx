//create a protected route component

import React, { useState, useEffect }  from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//use outlet to render child components
import {Outlet}  from "react-router-dom";
import { BACKEND_URL } from "../config/env";


; const ProtectedRoutes = () => { const [isAuthorized, setIsAuthorized] = useState(null); // null = unknown yet 
const authorize = async () => { 
    try { const res = await fetch(`${BACKEND_URL}/api/seller/authorize/token`, { credentials: "include", });

     const data = await res.json();

      setIsAuthorized(data.success); // true or false 

      } catch (err) { 
        console.error("Authorization failed", err);
         setIsAuthorized(false); } }; useEffect(() => { authorize(); }, []);
          if (isAuthorized === null) { // still loading, don’t redirect yet
     return <div>Loading...</div>;
    
    } 
 
 return isAuthorized ? <Outlet /> : <Navigate to="/login" />; 

}; 

     export default ProtectedRoutes;


