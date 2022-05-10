import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateUser(param) {
  const navigate = useNavigate();
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

  const [formErrors, setformErrors] = useState({});
  useEffect(() => {
    update();
   }, [formErrors])

 function update(){
  Axios.post(url, {
    email: data.mail,
    mobile: data.mobile,
    password: data.password,
    username: data.username,
    name: data.name,
    user_type: data.type,
  }).then((res) => {
    console.log(res.data);
    if(res.data.status == "yes"){
      param.setsucess({...param.sucess,statusmsg:"User Created", createuser:true})
      navigate("../listuserdata");
      //Alert.success('Success Alert')
    }
    else{
      param.setsucess({...param.sucess, createuser:false})
    }
    
  });
 }

  function submit(e) {
    e.preventDefault();
    console.log(data);
    setformErrors(validate(data));
  }

  const validate = (values) => {
    const errors = {};
    //const regex ;
    if(!data.username){
      errors.username = "Username is required!"
     
    }
    else
    {
      errors.flag1="checked";
    }
    
    if(!data.name){
      errors.name = "Name is required!"
    }
    {
      errors.flag2="checked";
    }
    if(!data.mail){
      errors.mail = "Email is required!"
    }
    {
      errors.flag3="checked";
    }
    
    if(!data.mobile){
      errors.mobile = "Mobile is required!"
    }
    {
      errors.flag4="checked";
    }
    if(!data.password){
      errors.password = "Password is required!"
    }
    {
      errors.flag5="checked";
    }
    if(!data.type){
      errors.type = "Type is required!"
    }
    {
      errors.flag5="checked";
    }
    return errors;

  };

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
               <p style={{color:"red"}}>{formErrors.name}</p>
               <div className="form-group col-md-6">
                 <label >Username</label>
                 <input  className="form-control" 
                 type="text"
                 id="username"
                 onChange={(e) => handle(e)}
                 value={data.username}
                  placeholder="User Name" />
               </div>
               <p style={{color:"red"}}>{formErrors.username}</p>
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
               <p style={{color:"red"}}>{formErrors.mobile}</p>
               <div className="form-group col-md-6">
                 <label >Email</label>
                 <input  className="form-control" 
                 type="text"
                 id="mail"
                 onChange={(e) => handle(e)}
                 value={data.mail}
                  placeholder="Email" />
               </div>
               <p style={{color:"red"}}>{formErrors.mail}</p>
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
            <p style={{color:"red"}}>{formErrors.password}</p>
              
            
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
          <p style={{color:"red"}}>{formErrors.type}</p>
         
              
            
          
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
