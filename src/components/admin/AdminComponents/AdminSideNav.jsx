import Axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import companyLogo from '../../../img/AdminLTELogo.png'
import { useNavigate, Link } from "react-router-dom";
import man from '../../../img/nouser.jpg';
//import '../../css/AdminSideNav.css';
import { Url} from '../../../constants/global'

function AdminSideNav({ setlim,page,activetog,del,edit,isMounted4,sideNavSel,details}) {
  const [reqStatus, setreqStatus] = useState("")
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  var fullloggedUser = JSON.parse(localStorage.getItem("fulldata"));
  //var reqdetails=JSON.parse(localStorage.getItem("reqdetail"));
  const {username:userName,user_type:userType} = loggedUser;
  //console.log(reqdetails.status)
useEffect(() => {
  checkUploadStatus()
}, [])

function checkUploadStatus() {
  
  Axios.post(
    Url.listidcardurl,
    { user_id: loggedUser.id, req_user_id:loggedUser.id, limit:1},
    { headers: { Token: loggedUser.api_token } }
  ).then((res) => {
    console.log(res)
    console.log(res.data.data.length)
    if(res.data.data.length != 0){
      console.log(res.data.data[0].status);
    }
    if(res.data.data.length == 0){
      setreqStatus("NotUpload")
    }
    else if(res.data.data[0].status == "Rejected"){
      setreqStatus("Rejected")
    }
    else if(res.data.data[0].status == "Confirm"){
      setreqStatus("Confirm")
    }
    else if(res.data.data[0].status == "Upload"){
      
      setreqStatus("Upload")
      
    }

    res.data.data.map((item)=>
    console.log(item)
    )
  });
  
}
if(reqStatus != ""){
  console.log(reqStatus)
}
  const isMounted1 = useRef(false);
  const isMounted2 = useRef(false);
  const isMounted3 = useRef(false);
  

  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    localStorage.removeItem("data");
    console.log("LoggedOut");
    navigate("/");
  }

 
/*

function listUser(){
    Axios.post(
      Url.userlisturl,
      { user_id: loggedUser.id, limit:page},
      { headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      let list = res.data.data;
      localStorage.setItem("userlist", JSON.stringify(list));
      console.log(res);
      navigate("./listuserdata");
      if(res.data.limit==0)
      {
        setlim(1);
      }

    });
  }


  useEffect(()=>{
    if (isMounted1.current){
      listUser();
    }
    else {
      isMounted1.current = true;
    }
  },[page]);

  useEffect(()=>{
    if (isMounted2.current){
      
      listUser();
      
    }
    else {
      isMounted2.current = true;
    }
  },[activetog]);


  
  useEffect(()=>{
    if (isMounted3.current){
      listUser();
    }
    else {
      isMounted3.current = true;
    }
},[del]);


useEffect(()=>{
  if (isMounted4.current){
    listUser();
  }
  else {
    isMounted4.current = true;
  }
 
},[edit]);

*/
 

  console.log(userType);
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}
        <a href="" className="brand-link navbar-primary">
        <img src={companyLogo} className="brand-image img-circle elevation-3" />
          <span className="brand-text font-weight-dark">Fishing App</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          
          <div className="image">
          <img src={details.photo==null?man:details.photo} className="img-circle elevation-2" alt="User Image" style={{ width: '1.5rem',height:'1.5rem'  }}/>
          </div>

            <div className="info">
              <Link to="home" className="d-block">
                {details.name}
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
              {reqStatus != "Confirm"?
              <li className="nav-item">
              <Link to="home" className={"nav-link " + (sideNavSel == "dashboard" ? "active":"") } data-toggle="pill">
                  <i className="nav-icon fas fa-th" />
                  <p>Dashboard</p>
                  </Link>
              </li>
              :null
              }
   

              {loggedUser.user_type == "employee" ?
              <>
              <li className="nav-item">
                  <Link to="listuserdata" className={"nav-link " + (sideNavSel == "manageusers" ? "active":"") }  data-toggle="pill" >
                  <i className="nav-icon fas fa-list" />
                  <p>Manage Users</p>
                  </Link>
                </li>
                <li className="nav-item">
                    <Link to="listfishingrequest" className={"nav-link " + (sideNavSel == "listfishreq" ? "active":"") } >
                      <i className="ion ion-star nav-icon" />
                      <p>Fishing Requests</p>
                    </Link>
                  </li>
              <li className="nav-item">
              <Link to="listidcard" className={"nav-link " + (sideNavSel == "listidcard" ? "active":"") } >
                <i className="ion ion-star nav-icon" />
                <p>Approve User ID</p>
              </Link>
            </li>
            <li className="nav-item">
            <Link to="rejecteduser" className={"nav-link " + (sideNavSel == "rejectedusers" ? "active":"") } >
              <i className="ion ion-star nav-icon" />
              <p>Rejected User ID</p>
            </Link>
          </li>
          </>
              :null}
              {loggedUser.user_type == "admin" ?
              
              <li className="nav-item">
                <Link to="listuserdata" className={"nav-link " + (sideNavSel == "manageusers" ? "active":"") }  data-toggle="pill" >
                  <i className="nav-icon fas fa-list" />
                  <p>Manage Users</p>
                </Link>
                
              </li>
              
              :null}
              
              {loggedUser.user_type == "admin" ?
              <li className="nav-item">
                    <Link to="listfishingrequest" className={"nav-link " + (sideNavSel == "listfishreq" ? "active":"") } >
                      <i className="ion ion-star nav-icon" />
                      <p>Fishing Requests</p>
                    </Link>
                  </li>
              :null}
               {loggedUser.user_type == "admin" ?
              <li className="nav-item has-treeview">
                <a href="" className="nav-link"  >
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Manage Master
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <Link to="listprice" className={"nav-link " + (sideNavSel == "listprice" ? "active":"") } >
                      <i className="ion ion-star nav-icon" />
                      <p>Manage Price</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="listfish" className={"nav-link " + (sideNavSel == "listfish" ? "active":"") } >
                      <i className="ion ion-star nav-icon" />
                      <p>Manage Fish</p>
                    </Link>
                  </li>
                  
                  
                  
                </ul>
              </li>
              :null}
                  
                 
            {loggedUser.user_type == "user" ?
            
            (reqStatus == "Confirm")  ?
            <>
            <li className="nav-item">
              <Link to="openreqlist" className={"nav-link " + (sideNavSel == "openfishingreq" ? "active":"") } >
                  <i className="ion ion-star nav-icon" />
                  <p>Open Fishing Requests</p>
                </Link>
              </li>
              <li className="nav-item">
              <Link to="closereqlist" className={"nav-link " + (sideNavSel == "closefishingreq" ? "active":"") } >
                  <i className="ion ion-star nav-icon" />
                  <p>Closed Fishing Requests</p>
                </Link>
              </li>
              
             {/*
            <li className="nav-item">
              <Link to="listfishcatch" className={"nav-link " + (sideNavSel == "listcaughtfish" ? "active":"") }  data-toggle="pill" >
                <i className="ion ion-star nav-icon" />
                <p>Manage Catch Fish</p>
              </Link>
            </li>
            */}
            </>:
            null
            :null}

              <li className="nav-item has-treeview">
                <a href="" className="nav-link"  >
                  <i className="nav-icon fas fa-cog" />
                  <p>
                    Settings
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                <li className="nav-item">
                    <Link to="settings/edituserdata" className={"nav-link " + (sideNavSel == "myprofile" ? "active":"") }>
                      <i className="ion ion-person nav-icon" />
                      <p>My Profile</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="settings/resetpassword"  className={"nav-link " + (sideNavSel == "resetpass" ? "active":"") }>
                      <i className="nav-icon fa fa-key" />
                      <p>Reset Password</p>
                    </Link>
                  </li>

                </ul>
              </li>
              
              <li className="nav-item">
                <a href="" onClick={(e) => submit(e)} className="nav-link">
                  <i className="nav-icon fas fa-power-off" />
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

export default AdminSideNav;
