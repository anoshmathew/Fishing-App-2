import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Url} from '../constants/global'

function ResetPassword(param) {
  param.setSideNavSel("resetpass");
  var errPass;
  const navigate = useNavigate();
  const [data, setData] = useState({
    OldPassword:"",
    NewPassword: "",
    ConPassword: "",
  });

  function submit(e) {
    e.preventDefault();
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      
      console.log("From Local Storage");
      console.log("loggedUser Token: ", token);
      
      if(data.NewPassword == data.ConPassword)
      {
      Axios.post(
        Url.passreseturl,
        { user_id: loggedUser.id,
          password: data.NewPassword },
        { headers: { Token: token } }
      ).then((res) => {
        console.log(res.data);
        console.log("Password Changed")
        navigate("../listuserdata");
        window.location.reload();
      });
    }
    else{
      errPass = "Password not Matching!!"
    }
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
    <div className="content-wrapper justify-content-left mt-5" style={{background:"white"}}>

<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Reset Password</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Reset Password</li>

        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>


    <section className="content">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-5">
         {/* general form elements */}
         <div className="card card-primary">
           <div className="card-header">
             <h3 className="card-title">Enter Password Informaion</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body">

             <div className="form-group">
                 <label >Old Password</label>
             <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                  </div>
               	  <input type="password" 
                   onChange={(e) => handle(e)}
                   className="form-control" 
                   value={data.OldPassword} 
                   name="OldPassword" 
                   id="OldPassword" 
                   placeholder="Old password" 
                   maxlength="20" 
                   required=""/>
                </div>
                </div>

               <div className="form-group">
                 <label >New Password</label>
                 <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                  </div>
               	  <input type="password" 
                   onChange={(e) => handle(e)}
                   className="form-control" 
                   value={data.NewPassword}
                   id="NewPassword" 
                   placeholder="New password" 
                   maxlength="20" 
                   required=""/>
                </div>

                
               </div>


               <div className="form-group">
                 <label >Confirm Password</label>
                 <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                  </div>
                 <input 
            className="form-control" 
           type="password"
                  id="ConPassword"
                  onChange={(e) => handle(e)}
                  value={data.ConPassword}
                  placeholder="Confirm Password" />
               </div>
               </div>
             </div>

             <div className="card-footer">
               <button type="submit" className="btn btn-primary btn-block" style={{width:"130px"}}>Change</button>
             </div>

           </form>
           
         </div>
         {/* /.card */}</div>
     </div>
     </div>
     </section>
 


     </div>

  );
}

export default ResetPassword;
