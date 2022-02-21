import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./css/RegisterForm.css"
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
  function submit(e) {
    e.preventDefault();
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
    <div className="register_main">
      <div className="register_header">
        <h2>Register</h2>
      </div>
      <div className="from_main">
        <form onSubmit={(e) => submit(e)}>
          <div className="form_fields">
            <div className="email_lable">
              <label>Email</label>
            </div>
            <div className="email_input">
              <input
                onChange={(e) => handle(e)}
                value={data.mail}
                id="mail"
                type="text"
                name="mail"
              />
            </div>
            <div className="mobile_lable">
              <label>Mobile</label>
            </div>
            <div className="mobile_input">
              <input
                onChange={(e) => handle(e)}
                value={data.mobile}
                id="mobile"
                type="tel"
                name="mobile"
              />
            </div>
            <div className="password_lable">
              <label>Password</label>
            </div>
            <div className="password_input">
              <input
                onChange={(e) => handle(e)}
                value={data.password}
                id="password"
                type="password"
                name="password"
              />
            </div>
            <div className="username_lable">
              <label>Username</label>
            </div>
            <div className="username_input">
              <input
                onChange={(e) => handle(e)}
                value={data.username}
                id="username"
                type="text"
                name="username"
              />
            </div>
            <div className="name_lable">
              <label>Name</label>
            </div>
            <div className="name_input">
              <input
                onChange={(e) => handle(e)}
                value={data.name}
                id="name"
                type="text"
                name="name"
              />
            </div>
            <div className="usertype_lable">
              <label>User Type</label>
            </div>
            <div className="usertype_input">
              <input
                onChange={(e) => handle(e)}
                value={data.type}
                id="type"
                type="text"
                name="usertype"
              />
            </div>
            <div className="button">
              <button id="reg">Register</button>
            </div>
          </div>
        </form>
        <div className="register_link">
          <span>Already have an account? </span>
          <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;
