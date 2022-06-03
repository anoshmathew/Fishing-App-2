import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import{Url} from "../../../constants/global"

function ListUserDataForm() {
  const navigate = useNavigate();


  const [data, setData] = useState({
    Limit: "",
    User_ID: "",
  });

  function submit(e) {
    e.preventDefault();
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      console.log("From Local Storage");
      console.log("loggedUser Token: ", token);
      console.log(data.User_ID,data.Limit)
      var obj= {
        user_id: data.User_ID,
        limit:data.Limit
      }
      localStorage.setItem("listform", JSON.stringify(obj));
      Axios.post(
        Url.userlisturl,
        { user_id: data.User_ID, limit:data.Limit},
        { headers: { Token: token } }
      ).then((res) => {
        let list = res.data.data;
        localStorage.setItem("userlist", JSON.stringify(list));
        console.log(list);
        navigate("../listuserdata");
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
      <h3>List User</h3>
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
        <label>
          limit:
          <input
            type="text"
            id="Limit"
            onChange={(e) => handle(e)}
            value={data.Limit}
          />
        </label>
        <br />
        
        <button>List</button>
      </form>
    </div>
  );
}

export default ListUserDataForm;
