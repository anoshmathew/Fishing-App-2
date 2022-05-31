import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Url} from '../constants/global'

function ResetPassword(param) {
  param.setSideNavSel("resetpass");
  const [alert, setalert] = useState({color:"",status:false,msg:""})
  const [errPass, seterrPass] = useState("")
  const navigate = useNavigate();
  const [data, setData] = useState({
    OldPassword:"",
    NewPassword: "",
    ConPassword: "",
  });

  if(alert.status){
    setTimeout(() => {
      setalert({color:"",status:false,msg:""})
      console.log(alert)
    }, 3000)
  }

  function submit(e) {
    e.preventDefault();
    var loggedUser = JSON.parse(localStorage.getItem("data"));

      const token = loggedUser.api_token;
      
      console.log("From Local Storage");
      console.log("loggedUser Token: ", token);
      
      if(data.NewPassword == data.ConPassword)
      {
      Axios.post(
        Url.passreseturl,
        { user_id: loggedUser.id,
          old_password:data.OldPassword,
          password: data.NewPassword },
        { headers: { Token: token } }
      ).then((res) => {
        console.log(res);
        if(res.data.status == "yes")
        {
          console.log("Password Changed")
          seterrPass("");
          setalert({color:"success",status:true,msg:"Password Changed!"});
          console.log(alert)
        }
       else{
        seterrPass("Invalid Password");
        setalert( {color:"danger",status:true,msg:res.data.message});
        console.log(alert) 
      }
        //navigate("../listuserdata")
      });
    }
    else{
      seterrPass("Passwords not Matching!!");
 
    }
    
  }


  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return ( 
    <div className="content-wrapper justify-content-left mt-5" style={{background:"white"}}>
<div className={"alert alert-"+(alert.color)+" alert-dismissable " + (alert.status?"":"hide")} style={{position: "absolute","z-index":"2","width":"100%"}}>
			<button type="button" className="close" data-dismiss="alert" aria-hidden="true">
			<i className="ace-icon fa fa-times"></i>
			</button>
			<strong>
			<i className="ace-icon fa fa-check"></i>
			</strong>
      {alert.msg}<br/>
	</div>
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
       <div className="col-md-12">
         {/* general form elements */}
         <div className="card card-primary">
           <div className="card-header">
             <h3 className="card-title">Enter Password Informaion</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body">

             <div className="form-group col-md-6">
                 <label >Old Password</label>
                 <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                  </div>
               	  <input type="password" 
                   onChange={(e) => handle(e)}
                   className="form-control" 
                   value={data.OldPassword}
                   id="OldPassword" 
                   placeholder="Old password" 
                   maxlength="20" 
                   required=""/>
                </div>
              </div>
               <div className="form-group col-md-6">
                 <label >New Password</label>
                 <div className="input-group">
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


               <div className="form-group col-md-6">
                 <label >Confirm Password</label>
                 <div className="input-group">
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
               <p style={{color:"red"}}>{errPass}</p>
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
