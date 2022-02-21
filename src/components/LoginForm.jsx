import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./css/LoginPage.css";
function LoginForm() {
  const navigate = useNavigate();
  const url = "http://work.phpwebsites.in/fishing/api/login";
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      username: data.username,
      password: data.password,
    }).then((res) => {
      let info = res.data.data;

      //  let token =info.api_token ;

      localStorage.setItem("data", JSON.stringify(info));
      console.log(info);

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
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div className="login_main">
      <div className="login_header">
        <h2>Login</h2>
      </div>
      <div className="form_main">
        <form onSubmit={(e) => submit(e)}>
          <div className="form_fields">
            <div className="username">
              <div className="username_lable">
                <label>Username:</label>
              </div>
              <div className="username_input">
                <input
                  type="text"
                  id="username"
                  onChange={(e) => handle(e)}
                  value={data.username}
                />
              </div>
            </div>
            <div className="password">
              <div className="password_lable">
                <label>Password:</label>
              </div>
              <div className="password_input">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => handle(e)}
                  value={data.password}
                />
              </div>
            </div>
            <div className="button">
              <button>Login</button>
            </div>
          </div>
        </form>
        <div className="register_link">
          <span>New user? </span>
          <Link to="register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
