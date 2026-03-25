//create a protected route component
import React, { useState, useEffect } from "react"; 
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { BACKEND_URL } from "../config/env.js";
import { useLocation } from "react-router-dom"; 
const url = `${BACKEND_URL}/api/seller/authorize/token `
const ProtectedRoutes = () => {
//make a request to the backend to check if the user is authenticated
 const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation(); 
  const checkAuth = async () => { try { const response = await fetch(url, { method: "GET",
     headers: { "Content-Type": "application/json", 

     },
      credentials: "include", // include cookies in the request 
      }); 
      const data = await response.json();
       console.log("Auth check response:", data); 
       setIsAuthenticated(data.success); 
    } catch (error) { 
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false); 
    } 
  }; 
  useEffect(() => { 
    checkAuth(); 
  },[]);

if (isAuthenticated === null) {
   // You can return a loading spinner here while checking authentication 
   return <div>Loading...</div>; 
  } 

if (!isAuthenticated) {
   return <Navigate to="/login" state={{ from: location.pathname }} replace />; 
  } 

return <Outlet />;
};
export default ProtectedRoutes;



