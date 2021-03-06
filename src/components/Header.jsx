import React,{ useEffect} from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import man from '../img/nouser.jpg';
import{Url} from "../constants/global"

function Header(param) {
  const navigate = useNavigate();
 

  function submit(e) {
    e.preventDefault();
    localStorage.removeItem("data");
    console.log("LoggedOut");
    navigate("/");
  }
  return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-light navbar-primary fixed-top">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Notifications Dropdown Menu */}

          <li className="nav-item dropdown">
            <a
              className="nav-link"
              href="#"
              data-toggle="dropdown" 
              aria-expanded="false"
              style={{color:'white'  }}

            >
          
          
          <img src={param.details.photo!="https://work.phpwebsites.in/fishing/public/uploads/medium"?param.details.photo:man} className="img-circle mr-1"  style={{ width: '1.5rem',height:'1.5rem'  }}/>
     
             
            {param.details.name}
             
            <span className="fas fa-angle-down ml-1" ></span>
            
            </a>
            
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right text_black">
          <Link to="settings/edituserdata" className="dropdown-item">
            <i className="ace-icon fa fa-user"></i> My Profile
          </Link>
          <div className="dropdown-divider"></div>
          <a href="" onClick={(e) => submit(e)} className="dropdown-item">
            <i className="ace-icon fa fa-power-off"></i> Logout
          </a>
       </div>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  );
}

export default Header;
