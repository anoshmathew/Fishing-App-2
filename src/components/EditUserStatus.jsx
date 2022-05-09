import React, { useState } from "react";
import Axios from "axios";
import { Url} from '../constants/global'

function EditUserStatus() {
 
  const [data, setData] = useState({
    User_ID: "",
    Status: "",
  });

  function submit(e) {
    e.preventDefault();
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      console.log("From Local Storage");
      console.log("loggedUser Token: ", token);
      Axios.post(
        Url.userstatusurl,
        { user_id: data.User_ID, status: data.Status },
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
      <h3>Edit User Status</h3>
      <form onSubmit={(e) => submit(e)}>
        <br />
        <label>
          User ID:
          <input
            type="text"
            id="User_ID"
            onChange={(e) => handle(e)}
            value={data.User_ID}
          />
        </label>
        <br />
        <br />
        <label>
          Status:
          <input
            type="text"
            id="Status"
            onChange={(e) => handle(e)}
            value={data.Status}
          />
        </label>
        <br />
        <button>Edit Status</button>
      </form>
    </div>
  );
}

export default EditUserStatus;
