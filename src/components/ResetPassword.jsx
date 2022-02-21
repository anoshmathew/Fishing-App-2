import React, { useState } from "react";
import Axios from "axios";

function ResetPassword() {
  const url = "http://work.phpwebsites.in/fishing/api/resetpassword";
  const [data, setData] = useState({
    NewPassword: "",
    User_ID: "",
  });

  function submit(e) {
    e.preventDefault();
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      console.log("From Local Storage");
      console.log("loggedUser Token: ", token);
      Axios.post(
        url,
        { user_id: data.User_ID, password: data.NewPassword },
        { headers: { Token: token } }
      ).then((res) => {
        console.log(res.data);
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
    <div className="content-wrapper">
      <h3>Change Password</h3>
      <form onSubmit={(e) => submit(e)}>
        <br />
        
        <label>
          User ID:
          <input
            type="text"
            id="User_ID"
            onChange={(e) => handle(e)}
            value={data.UserID}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="text"
            id="NewPassword"
            onChange={(e) => handle(e)}
            value={data.NewPassword}
          />
        </label>
        <br />
        <button>Change</button>
      </form>
    </div>
  );
}

export default ResetPassword;
