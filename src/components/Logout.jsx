import React from 'react'
import { useNavigate, Link } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
        
        localStorage.removeItem("data")
        
            console.log("LoggedOut");
            navigate("../../");
        
       
   
  
}

export default Logout