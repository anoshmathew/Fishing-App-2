import Axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import{Url} from "../../../constants/global"


function UserSideNav() {
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const {username:userName,user_type:userType} = loggedUser;
  const url = "http://work.phpwebsites.in/fishing/api/userslist";
  

  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    localStorage.removeItem("data");
    console.log("LoggedOut");
    navigate("/");
  }



  console.log(userType);
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="" className="brand-link">
          <span className="brand-text font-weight-light">Fishing App</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
            <Link to="home" className="d-block">
                Username is {userName}
              </Link>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library  ="listuserdataform" */}

              <li className="nav-item menu-open">
                <a className="nav-link">
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Settings
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="settings/resetpassword" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Change Password</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="settings/edituserstatus" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Change Status</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="settings/edituserdata" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Edit User Data</p>
                    </Link>
                  </li>
                </ul>
              </li>


              <li className="nav-header">IN/OUT</li>
              <li className="nav-item">
                <a onClick={(e) => submit(e)} className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>Logout</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
}

export default UserSideNav;
