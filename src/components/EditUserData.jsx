import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import man from '../img/avatar5.png'
import FileUpload from "./admin/AdminComponents/FileUpload";
//import './css/EditUserData.css'

function EditUserData(param) {
  const url = "http://work.phpwebsites.in/fishing/api/edituser";
  const url2 = "http://work.phpwebsites.in/fishing/api/uploadph";
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();
  console.log("loggedUser id: ", loggedUser.id);
  const [data, setData] = useState({
    User_ID: loggedUser.id,
    Email: loggedUser.email,
    Mobile: loggedUser.mobile,
    UserName: loggedUser.username,
    Name: loggedUser.name,
    file:"",
  });
  const [file, setfile] = useState();
 param.setSideNavSel("myprofile")
 
  function submit(e) {
    e.preventDefault();
    
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      console.log("From Local Storage");
      console.log("loggedUser Token: ", token);
      Axios.post(
        url,
        {
          user_id: loggedUser.id,
          email: data.Email,
          mobile: data.Mobile,
          username: data.UserName,
          name: data.Name,
        },
        { headers: { Token: token } }
      ).then((res) => {
        console.log(loggedUser.id);
        param.setedit(param.edit+1);
       navigate("../listuserdata");
       //window.location.reload();  
      });
      
    } else {
      console.log("Local Storage is Empty");
    }
  }
  function handlefile(e) {
    const filedata = { ...file };
    filedata[e.target.id] = e.target.value;
    setfile(filedata);
    console.log(filedata);
  }
  var bodyFormData = new FormData();
  const [picture, setPicture] = useState(null);
  const uploadPicture = (e) => {
   
        /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
       
           setPicture(e.target.files[0])
        console.log(e.target.files[0]);
    
};

  function handleUpload(e) {
    e.preventDefault();
    
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      bodyFormData.append('user_id', loggedUser.id);
      bodyFormData.append('photo', picture);
     
      console.log(picture);
      
      Axios.post(
        url2,
        bodyFormData,
        { headers: {  
          Token: token,
         // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          //'Content-Type': 'multipart/form-data'
        } 
          

      }
      ).then((res) => {
        console.log(res);
       // edit.setedit(edit.edit+1); content-type : multipart/form-data ,
       // navigate("../listuserdata");
       //window.location.reload();
        
      });
      
    } else {
      console.log("Local Storage is Empty");
    }
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div className="content-wrapper justify-content-left mt-5">


  <div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">My Profile</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">My Profile</li>

        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
  </div>


<section className="content">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-8 mx-auto">
         {/* general form elements */}
         <div className="card card-warning">
           <div className="card-header">
             <h3 className="card-title">My Profile</h3>
           </div>
          
          
         
          
          <div className="card-body text-center">
            
          <div className="row">
          <div className="col-md-6" >
          <img src={man} className="brand-image img-circle elevation-3" />
          <div style={{width:"100%",backgroundColor:"rgb(255, 193, 7)" , borderRadius:"4px"}}>
            <input type="file" name="file" id="file" onChange={(e)=>uploadPicture(e)} />
          </div>
          <div>
            <button className="btn btn-primary" onClick={e => handleUpload(e)}>Upload</button>
          </div>
        
          </div>
          
            <div className="col-md-6">
            <div className="row mt-4 text-left" style={{fontWeight:"bold"}}>
        
            <table>
            <tbody>
            
  <tr>
    <td>Username</td>
    <td>:</td>
    <td>{loggedUser.username}</td>
  </tr>
  <tr>
    <td>Name</td>
    <td>:</td>
    <td>{loggedUser.name}</td>
  </tr>
  <tr>
    <td>Id</td>
    <td>:</td>
    <td>{loggedUser.id}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>:</td>
    <td>{loggedUser.email}</td>
  </tr>
  <tr>
    <td>Mobile</td>
    <td>:</td>
    <td>{loggedUser.mobile}</td>
  </tr>
  <tr>
    <td>Status</td>
    <td>:</td>
    <td>{loggedUser.status}</td>
  </tr>
  </tbody>
</table>
            </div>
              
             
            </div>
          </div>
          
         

          
          
          </div>
          </div>
          </div>
          </div>
          </div>
         
 </section>


 <div className="card-body text-center">
 <div className="row">
 <div className="col-12">
    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Edit Profile</button>
  </div>
  </div>
  </div>

 <section className="content collapse multi-collapse" id="multiCollapseExample2">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-8 mx-auto">
         {/* general form elements */}
         <div className="card card-primary">
           <div className="card-header">
             <h3 className="card-title">Edit Details</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body">
               
               
             <div className="row">
             <div className="form-group col-md-6">
                 <label >Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="Name"
                  onChange={(e) => handle(e)}
                  value={data.Name}
                  placeholder="Name" />
               </div>
               <div className="form-group col-md-6">
                 <label >Username</label>
                 <input  className="form-control" 
                 type="text"
                 id="UserName"
                 onChange={(e) => handle(e)}
                 value={data.UserName}
                  placeholder="User Name"/>
               </div>
               </div>
               <div className="row">
               <div className="form-group col-md-6">
                 <label >Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="Mobile"
                  onChange={(e) => handle(e)}
                  value={data.Mobile}
                  placeholder="Mobile" />
               </div>
               <div className="form-group col-md-6">
                 <label >Email</label>
                 <input  className="form-control" 
                 type="text"
                 id="Email"
                 onChange={(e) => handle(e)}
                 value={data.Email}
                  placeholder="Email" />
               </div>
               </div>



               
             </div>

             <div className="card-footer">
               <button type="submit" className="btn btn-primary">Submit</button>
             </div>

           </form>
           
         </div>
         {/* /.card */}</div>
     </div>
     </div>
     </section>


      
    
    </div>
  );
}

export default EditUserData;
