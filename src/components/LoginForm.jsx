import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Url} from '../constants/global'
//import "./css/LoginPage.css";
function LoginForm(param) {
  const navigate = useNavigate();
  let msg ;
  
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setformErrors] = useState({});
  const [popup, setpopup] = useState({mesg:""});
  const errors = {};

  const validate = (values) => {
    //const regex ;
    if(!data.username){
      errors.username = "Username is required!"
      errors.flag1=null;
    }
    else
    {
      errors.flag1="checked";
    }
    if(!data.password){
      errors.password = "Password is required!"
      errors.flag2=null;
    }
    else
    {
      errors.flag2="checked";
    }
    
    return errors;

  };
  useEffect(() => {

    onSignup();
    
  }, [formErrors])
  
  function onSignup(){
    if((Object.entries(formErrors).length !== 0)&&(data.username != "")&&(data.password !="")){
      Axios.post(Url.loginurl, {
        username: data.username,
        password: data.password,
      }).then((res) => {
        let info = res.data.data;
        msg = res.data.message
        //  let token =info.api_token ;
        localStorage.setItem("data", JSON.stringify(info));
        localStorage.setItem("relo", false);
        if (msg == "Inavlid Username/Password"){
          setpopup({mesg:"Inavlid Username/Password"})
          //alert("Inavlid Username/Password");
        }
        else{
          if(res.data.photo=="http://work.phpwebsites.in/fishing/public/uploads/medium"){
            param.setdetails({name:res.data.data.username,photo:null});
            console.log("1")
          }
          else{
            param.setdetails({name:res.data.data.username,photo:res.data.photo});
            console.log("2")
          }
            
          
          
          navigate("admin/home");
        }
        console.log(res);
      });
    }
  }
  if(popup.mesg!=""){
    setTimeout(() => {
      setpopup({mesg:""})
    }, 3000)
  }
 
 
  function submit(e) {
    e.preventDefault();
    setformErrors(validate(data));
    
   // console.log(Object.entries(formErrors).length)
   
  }
  

 

  const handleClick = () => navigate("register");
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div>
      <div className={"alert alert-danger alert-dismissable " + (popup.mesg!=""?"":"hide")} style={{position: "absolute","z-index":"2","width":"100%"}}>
			<button type="button" className="close" data-dismiss="alert" aria-hidden="true">
			<i className="ace-icon fa fa-times"></i>
			</button>
			<strong>
			<i className="ace-icon fa fa-check"></i>
			</strong>
      {popup.mesg}<br/>
	    </div>

  <div className="hold-transition login-page">

<div className="login-box">
  <div className="login-logo">
    <a href=""><b>FISHING </b>APP</a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <form onSubmit={(e) => submit(e)}>
        <div className="input-group mb-3">
          <input type="text" className="form-control"
          id="username"
          onChange={(e) => handle(e)}
          value={data.username}
          placeholder="Username" />
          <div className="input-group-append">
            <div className="input-group-text">
            <span className="fas fa-user" />
            </div>
          </div>
        </div>
        <p style={{color:"red"}}>{formErrors.username}</p>
        <div className="input-group mb-3">
          <input type="password" 
          className="form-control" 
          id="password"
          onChange={(e) => handle(e)}
          value={data.password}
          placeholder="Password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <p style={{color:"red"}}>{formErrors.password}</p>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">
                Remember Me
              </label>
            </div>
          </div>
          {/* /.col */}
          <div className="col-4">
            <button type="submit" className="btn btn-primary"><b>Sign In</b></button>
          </div>
          {/* /.col */}
        </div>
      </form>

      {/* /.social-auth-links */}
   
      <div className="row">
        <div className="col-md-12 mt-4 text-center">
        <button className="btn btn-primary rounded-pill" onClick={handleClick}>Register a new membership</button>
        </div>
      </div>
    </div>
    {/* /.login-card-body */}
  </div>
</div>



  </div>

    </div>

  );
}
export default LoginForm;
