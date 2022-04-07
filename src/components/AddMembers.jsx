
import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddMembers() {
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
  function submit(e) {
    e.preventDefault();
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
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div className="content-wrapper justify-content-center">
       <div className="hold-transition register-page">
  <div className="register-box">
    <div className="register-logo">
      <a><b>ADD </b>USERS</a>
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

     
         
          

        <div className="input-group mb-3">
          
    <select className="custom-select my-1" style={{color:"rgb(143, 143, 143)"}} onChange={(e) => handle(e)} id="type" name="usertype" >
      <option value="">-- Select the User Type --</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
      <option value="employee">Employee</option>
    </select>
          </div>


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

          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Retype password" />
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
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
            {/* /.col */}
          </div>
        </form>
      </div>
      {/* /.form-box */}
    </div>{/* /.card */}
  </div>
  {/* /.register-box */}



   
    </div> 
    </div>
  )
}

export default AddMembers