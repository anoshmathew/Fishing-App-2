import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import{Url} from "../constants/global"

function EditUserForm(edit,setedit) {
  //const url = "http://work.phpwebsites.in/fishing/api/edituser";
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const location = useLocation()
  const itm = location.state;
  const navigate = useNavigate();
  
 
  const [data, setData] = useState({
    
    Email: itm.email,
    Mobile: itm.mobile,
    UserName: itm.username,
    Name: itm.name,
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  
 useEffect(() => {
  update();
 }, [formErrors])

 function update(){

  if((Object.entries(formErrors).length !== 0)&&(data.Mobile != "")&&(data.Email !="")&&(data.UserName != "")&&(data.Name!="")){
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      console.log("From Local Storage");
      console.log("loggedUser Token: ", token);
      console.log(data.Mobile);
      Axios.post(
        Url.edituserurl,
        {
          user_id: loggedUser.id,
          email: data.Email,
          mobile: data.Mobile,
          username: data.UserName,
          name: data.Name,
          id: itm.id,
        },
        { headers: { Token: token } }
      ).then((res) => {
        
      edit.setedit(edit.edit+1);
       navigate("../listuserdata");   
        
      });
    } else {
      console.log("Local Storage is Empty");
    }
  }
 }
 
  function submit(e) {
    e.preventDefault();
    setformErrors(validate(data));
    //setIsSubmit(true);  
   
    
    
  }

  

 

  const validate = (values) => {
    const errors = {};
    //const regex ;
    if(!data.UserName){
      errors.username = "Username is required!"
     
    }
    else
    {
      errors.flag1="checked";
    }
    
    if(!data.Name){
      errors.name = "Name is required!"
    }
    {
      errors.flag2="checked";
    }
    if(!data.Email){
      errors.mail = "Email is required!"
    }
    {
      errors.flag3="checked";
    }
    
    if(!data.Mobile){
      errors.mobile = "Mobile is required!"
    }
    {
      errors.flag4="checked";
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
        <h1 className="m-0 text-dark">Edit Member</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Edit User</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>

 <div className="card-body">
 
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-8">
         {/* general form elements */}
         <div className="card card-primary">
           <div className="card-header">
             <h3 className="card-title">Edit Details</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body" style={{ width: '28rem' }}>
               
               

             <div className="form-group col-xs-12">
                 <label >Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="Name"
                  onChange={(e) => handle(e)}
                  value={data.Name}
                  placeholder="Name" />
               </div>
               <p style={{color:"red"}}>{formErrors.name}</p>
               <div className="form-group col-xs-12">
                 <label >Username</label>
                 <input  className="form-control" 
                 type="text"
                 id="UserName"
                 onChange={(e) => handle(e)}
                 value={data.UserName}
                  placeholder="User Name" />
               </div>
               <p style={{color:"red"}}>{formErrors.username}</p>
               <div className="form-group col-xs-12">
                 <label >Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="Mobile"
                  onChange={(e) => handle(e)}
                  value={data.Mobile}
                  placeholder="Mobile" />
               </div>
               <p style={{color:"red"}}>{formErrors.mobile}</p>
               <div className="form-group col-xs-12">
                 <label >Email</label>
                 <input  className="form-control" 
                 type="text"
                 id="Email"
                 onChange={(e) => handle(e)}
                 value={data.Email}
                  placeholder="Email" />
               </div>
               <p style={{color:"red"}}>{formErrors.mail}</p>
               
             </div>

             <div className="card-footer">
               <button type="submit" className="btn btn-primary">Save</button>
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

export default EditUserForm;
