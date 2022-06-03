import React from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import Uploadid from "./UploadID/Uploadid";
import { Url } from '../../../constants/global'
import WaitingForApproval from "./others/WaitingForApproval";
import CreateRequest from "./fishingrequest/CreateRequest";

function AdminHome(param) {

const [reqStatus, setreqStatus] = useState("")
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  var loggedUserfull = JSON.parse(localStorage.getItem("fulldata"));
  const [uploaded, setuploaded] = useState(false)
  const token = loggedUser.api_token;
  //var reqdetails =JSON.parse(localStorage.getItem("reqdetail"));
  //console.log(loggedUserfull)
  useEffect(()=>{
    checkUploadStatus();
    
},[]);
useEffect(()=>{
  checkUploadStatus();
  
},[uploaded]);

function checkUploadStatus() {
  param.setSideNavSel("dashboard")
  Axios.post(
    Url.listidcardurl,
    { user_id: loggedUser.id,req_user_id:loggedUser.id, limit:1},
    { headers: { Token: loggedUser.api_token } }
  ).then((res) => {
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

//if(isMounted5==false){
//  isMounted5=true;
// window.location.reload();
//}


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
            <li className="breadcrumb-item"><a href="">{loggedUser.user_type == "admin"?"Admin":loggedUser.user_type == "user"?"User":"Employee"}</a></li>
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

      {loggedUser.user_type == "admin" ?
      
      <div className="col-xl-4 ">
          {/* small box */}
          <div className="small-box bg-primary">
            <div className="inner" style={{height:"120px"}}>
              <h3>Manage Users</h3>
           
            </div>
            <div className="icon">
            <i className="ion ion-stats-bars" />
            </div>
            <Link to="../listuserdata" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>

      : null}

{loggedUser.user_type == "user" ?
     (reqStatus == "NotUpload")  ?
      <>
    
      <Uploadid setuploaded={setuploaded} uploaded={uploaded}/>
      
      </>
      
      :(reqStatus == "Rejected" ) ?
      <>
      <h6 style={{color:"red"}}>*Sorry! Your ID Card has been rejected. Please upload again!!</h6>
      <Uploadid setuploaded={setuploaded} uploaded={uploaded}/>
      
      </>
      :(reqStatus == "Upload" ) ?
<>
      
      <WaitingForApproval/>
      
      </>:(reqStatus == "Confirm" ) ?
      <>
      <CreateRequest/>
      </>
      :null
      : null}
     
     {loggedUser.user_type != "user" ?
        <>
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
        </>
      :null}
        
      </div>
     
    </div>
    </section>
    
    </div>
    
    

  );
}

export default AdminHome;
