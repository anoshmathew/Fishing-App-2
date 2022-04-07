import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  var msg;
  const url = "http://work.phpwebsites.in/fishing/api/register";
  const [data, setData] = useState({
    mail: "",
    mobile: "",
    password: "",
    newpassword: "",
    name: "",
    
    username: "",
    type: "",
  });
  function submit(e) {
    e.preventDefault();
    if(data.password ==data.newpassword){

   
    console.log(data);
    Axios.post(url, {
      email: data.mail,
      mobile: data.mobile,
      password: data.password,
      username: data.username,
      name: data.name,
      user_type: data.type,
    }).then((res) => {
      console.log(res.data);
      navigate("/");
    });
  }
  else{
    msg ="Password dosen't Match";
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
        <h1 className="m-0 text-dark">Add New User</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Add User</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>

 <div className="card-body">
 
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-12">
         {/* general form elements */}
         <div className="card card-primary">
           <div className="card-header">
             <h3 className="card-title">Create New User</h3>
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
                  id="name"
                  onChange={(e) => handle(e)}
                  value={data.name}
                  placeholder="Name" />
               </div>
               <div className="form-group col-md-6">
                 <label >Username</label>
                 <input  className="form-control" 
                 type="text"
                 id="username"
                 onChange={(e) => handle(e)}
                 value={data.username}
                  placeholder="User Name" />
               </div>
               </div>
               <div className="row">
               <div className="form-group col-md-6">
                 <label >Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="mobile"
                  onChange={(e) => handle(e)}
                  value={data.mobile}
                  placeholder="Mobile" />
               </div>
               
               <div className="form-group col-md-6">
                 <label >Email</label>
                 <input  className="form-control" 
                 type="text"
                 id="mail"
                 onChange={(e) => handle(e)}
                 value={data.mail}
                  placeholder="Email" />
               </div>
      
              </div>
                
               
               <div className="row">
               <div className="form-group col-md-6">
               <label>Password</label>
            <input  onChange={(e) => handle(e)}
                value={data.password}
                id="password"
                type="password"
               
                className="form-control" 
                placeholder="Password" />
            <div className="input-group-append">
            </div>
            </div>
            
              
            
          <div className="form-group col-md-6">
               <label >User Type</label>
          <select className="form-control" style={{color:"rgb(143, 143, 143)"}} onChange={(e) => handle(e)} id="type" name="usertype" >
            <option value="">-- Select the User Type --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="employee">Employee</option>
          </select>
                </div>
          </div>

         
              
            
          
            {/* /.col */}
            
           
              
              
              <div className="card-footer">
              <button type="submit" className="btn btn-primary btn-block"  style={{width:"130px"}}>Register</button>
            </div>
            {/* /.col */}
            
        

               
             </div>

            

           </form>
           
         </div>
         {/* /.card */}</div>
     </div>
     </div>
    </div>
    </div>
  );
}
export default CreateUser;
