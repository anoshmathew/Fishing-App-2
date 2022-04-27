import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import "./css/LoginPage.css";
function LoginForm() {
  const navigate = useNavigate();
  let msg ;
  const url = "http://work.phpwebsites.in/fishing/api/login";
  const [data, setData] = useState({
    username: "",
    password: "",
  });

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

  const [formErrors, setformErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);

  function submit(e) {
    e.preventDefault();

    setformErrors(validate(data));
    setIsSubmit(true);
    console.log(formErrors);

  }
  if((formErrors.flag1=="checked")&&(formErrors.flag2=="checked")){
    Axios.post(url, {
      username: data.username,
      password: data.password,
    }).then((res) => {
      let info = res.data.data;
      msg = res.data.message
      //  let token =info.api_token ;
      localStorage.setItem("data", JSON.stringify(info));
      localStorage.setItem("relo", false);
      if (msg == "Inavlid Username/Password"){
        alert("Inavlid Username/Password");
      }

      //var loggedUser = JSON.parse(localStorage.getItem('data'));
      // console.log('loggedUser Token: ',loggedUser.api_token);
      var loggedUser = JSON.parse(localStorage.getItem("data"));
      if (loggedUser.user_type == "admin") {
      
        navigate("admin/home");
      } else if (loggedUser.user_type == "user") {
        navigate("user/home");
      }
    });
  }



  useEffect(() => {
    
    
  }, [formErrors])
 

  const handleClick = () => navigate("register");
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    
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
  );
}
export default LoginForm;
