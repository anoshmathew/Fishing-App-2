import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import "./css/RegisterForm.css"
function RegisterForm() {
  const navigate = useNavigate();

  const url = "http://work.phpwebsites.in/fishing/api/register";
  const [data, setData] = useState({
    mail: "",
    mobile: "",
    password: "",
    name: "",
    username: "",
    type: "",
  });
  
const [formErrors, setformErrors] = useState({});
const [isSubmit,setIsSubmit] = useState(false);
const [popup, setpopup] = useState({color:"",mesg:""});
  function submit(e) {
    e.preventDefault();
    setformErrors(validate(data));
    //setIsSubmit(true);
    console.log(data);
    console.log(formErrors);
  }

  if(popup.mesg!=""){
    setTimeout(() => {
      setpopup({color:"",mesg:""})
    }, 3000)
  }

  useEffect(() => {
    registerfun();
    
  }, [formErrors])
  
  function registerfun(){
    console.log(data);
    if((Object.entries(formErrors).length !== 0)&&(formErrors.flag1=="checked")&&(formErrors.flag2=="checked")&&(formErrors.flag3=="checked")&&(formErrors.flag4=="checked")&&(formErrors.flag5=="checked")&&(formErrors.flag6=="checked")){
      Axios.post(url, {
        email: data.mail,
        mobile: data.mobile,
        password: data.password,
        username: data.username,
        name: data.name,
        user_type: data.type,
      }).then((res) => {
        console.log(res);
         //navigate("/");
         if(res.data.status="Username Already Exist"){
          setpopup({color:"danger",mesg:"Username Already Exist"})
         }
         else{
          setpopup({color:"sucess",mesg:"Registered"})
         }
         
      });
    }
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
    if(!data.password){
      errors.password = "Password is required!"
    }
    else
    {
      errors.flag2="checked";
    }
    if(!data.name){
      errors.name = "Name is required!"
    }
    {
      errors.flag3="checked";
    }
    if(!data.mail){
      errors.mail = "Email is required!"
    }
    {
      errors.flag4="checked";
    }
    if(!data.type){
      errors.type = "Type is required!"
    }
    {
      errors.flag5="checked";
    }
    if(!data.mobile){
      errors.mobile = "Mobile is required!"
    }
    {
      errors.flag6="checked";
    }
    return errors;

  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
<div>
<div className={"alert alert-"+(popup.color) + " alert-dismissable " + (popup.mesg!=""?"":"hide")} style={{position: "absolute","z-index":"2","width":"100%"}}>
			<button type="button" className="close" data-dismiss="alert" aria-hidden="true">
			<i className="ace-icon fa fa-times"></i>
			</button>
			<strong>
			<i className="ace-icon fa fa-check"></i>
			</strong>
      {popup.mesg}<br/>
	    </div>

      <div className="hold-transition register-page">
  <div className="register-box">
    <div className="register-logo">
      <a><b>FISHING </b>APP</a>
    </div>
    <div className="card">
      <div className="card-body register-card-body">
        <p className="login-box-msg">Register a new membership</p>
        <form onSubmit={(e) => submit(e)}>
          <div className="input-group mb-3">
            <input onChange={(e) => handle(e)}
                value={data.name}
                id="name"
                type="text"
                name="name" className="form-control" placeholder="Name" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-user" />
              </div>
            </div>
          </div>
          <p style={{color:"red"}}>{formErrors.name}</p>
          <div className="input-group mb-3">
            <input onChange={(e) => handle(e)}
                value={data.username}
                id="username"
                type="text"
                name="username" 
                className="form-control" placeholder="Username" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-user" />
              </div>
            </div>
          </div>
          <p style={{color:"red"}}>{formErrors.username}</p>
          <div className="input-group mb-3">
            <input 
              onChange={(e) => handle(e)}
                value={data.mail}
                id="mail"
                type="email"
                name="mail"
                className="form-control" 
                placeholder="Email" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <p style={{color:"red"}}>{formErrors.mail}</p>
          <div className="input-group mb-3">
            <input onChange={(e) => handle(e)}
                value={data.mobile}
                id="mobile"
                type="tel"
                name="mobile" className="form-control" placeholder="Mobile" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-phone" />
              </div>
            </div>
          </div>
          <p style={{color:"red"}}>{formErrors.mobile}</p>
     
         
          

          <div className="input-group mb-3">
          
    <select className="custom-select my-1" style={{color:"rgb(143, 143, 143)"}} onChange={(e) => handle(e)} id="type" name="usertype" >
      <option value="">-- Select the User Type --</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
      <option value="employee">Employee</option>
    </select>
          </div>
          <p style={{color:"red"}}>{formErrors.type}</p>


          <div className="input-group mb-3">
            <input  onChange={(e) => handle(e)}
                value={data.password}
                id="password"
                type="password"
                name="password" 
                className="form-control" 
                placeholder="Password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <p style={{color:"red"}}>{formErrors.password}</p>
          <div className="input-group mb-3">
            <input type="password" 
            className="form-control" 
            placeholder="Retype password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          
         

          <div className="row">
            <div className="col-8">
              
            </div>
            {/* /.col */}
            <div className="col-4 mt-2">
              <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
            {/* /.col */}
          </div>
        </form>
        <div className="row">

        <div className="col-md-12 mt-4 text-center">
        <Link to="/" >Already a member? Click here to login</Link>
        </div>
        </div>
      </div>
      {/* /.form-box */}
    </div>{/* /.card */}
  </div>
  {/* /.register-box */}



   
    </div>
</div>
    
  );
}
export default RegisterForm;
