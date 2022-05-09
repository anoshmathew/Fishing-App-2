import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";

function Uploadid(param) {
    param.setSideNavSel("uploadid")
    const url2 = "http://work.phpwebsites.in/fishing/api/uploadid";
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    var bodyFormData = new FormData();
  const [picture, setPicture] = useState(null);
  const uploadPicture = (e) => {
   // e.preventDefault();
        /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
        
        setPicture(e.target.files[0])
        console.log(e.target.files);
       // setpic(URL.createObjectURL(e.target.files[0]))
    
};

  function handleUpload(e) {
    e.preventDefault();
    
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      bodyFormData.append('user_id', loggedUser.id);
      bodyFormData.append('id_card', picture);
     
      console.log(picture);
      
      Axios.post(
        url2,
        bodyFormData,
        { headers: {  
          Token: token,
         // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          //'Content-Type': 'multipart/form-data'
        } 
      }
      ).then((res) => {
        console.log(res);
       
       setPicture()
       // navigate("../listuserdata");
       //window.location.reload();
        
      });
    }
    else {
      console.log("Local Storage is Empty");
    }
  }
  return (
    <div className="content-wrapper justify-content-center mt-5" >
<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Upload ID</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">User</a></li>
          <li className="breadcrumb-item active">Upload ID</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>


<div className="col-md-6" >
          <div>
            <input type="file" name="file" id="file" onChange={(e)=>uploadPicture(e)} />
          </div>
          <div>
            <button className="btn btn-primary" onClick={e => handleUpload(e)}>Upload</button>
          </div>
          
          
        
          </div>

   
    </div>
  )
}

export default Uploadid