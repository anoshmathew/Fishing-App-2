import React from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState,useRef } from "react";

function AdminHome(page) {
  const isMounted1 = useRef(false);
  const navigate = useNavigate();
  var loggedUser = JSON.parse(localStorage.getItem("data"));

  const url = "http://work.phpwebsites.in/fishing/api/userslist";
  
//if(isMounted5==false){
//  isMounted5=true;
// window.location.reload();
//}
page.setSideNavSel("dashboard")
  function listUser(){
    console.log(page.page);
    Axios.post(
      url,
      { user_id: loggedUser.id, limit:page.page},
      { headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      let list = res.data.data;
      localStorage.setItem("userlist", JSON.stringify(list));
      console.log(res);
      navigate("../listuserdata");
      

    });
    }
  

  return (
    <div className="content-wrapper">
<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark"></h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href=""></a></li>
          <li className="breadcrumb-item active"></li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>


  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-sm-6">
          <h1 className="m-0">Dashboard</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Admin</a></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      {/* Small boxes (Stat box) */}
      <div className="row">
        <div className="col-xl-4 ">
          {/* small box */}
          <div className="small-box bg-primary">
            <div className="inner" style={{height:"120px"}}>
              <h3>Manage Users</h3>
           
            </div>
            <div className="icon">
            <i className="ion ion-stats-bars" />
            </div>
            <a href="#" onClick={listUser} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        <div className="col-xl-4">
          {/* small box */}
          <div className="small-box bg-info">
            <div className="inner" style={{height:"120px"}}>
              <h3>My Profile</h3>
            </div>
            <div className="icon">
              <i className="ion ion-person" />
            </div>
            <Link to="../settings/edituserdata" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-xl-4">
          {/* small box */}
          <div className="small-box bg-success">
            <div className="inner"  style={{height:"120px"}}>
              <h3>Change Password</h3>
            </div>
            <div className="icon">
              <i className="ion ion-key" />
            </div>
            <Link to="../settings/resetpassword" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        
        
      </div>
    </div>
    </section>
    </div>

  );
}

export default AdminHome;
