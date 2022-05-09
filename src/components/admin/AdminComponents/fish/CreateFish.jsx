import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Url} from "../../../../constants/global"

function CreateFish() {
  const navigate = useNavigate();
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const [formErrors, setformErrors] = useState({});
  var msg;
  
  const token = loggedUser.api_token;
  const [data, setData] = useState({  
   
    name: "",   
    
   
  });
  const validate = (values) => {
    const errors = {};
    //const regex ;
    if(!data.name){
      errors.name = "Fish name is required!"
      errors.flag1="";
    }
    else
    {
      errors.flag1="checked";
    }
    return errors;
  }
  function submit(e) {
    e.preventDefault();
    setformErrors(validate(data));
    console.log(loggedUser.id)
    if(data.name!=""){

    console.log(data);
    Axios.post(Url.creatfishurl, {
      user_id: loggedUser.id ,
      fish_name: data.name,    
    },{ headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      console.log(res.data);
      navigate("../listfish");
    });
  }
  
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  return (
    <div className="content-wrapper justify-content-left mt-5">

<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Add Fish</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Add Fish</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>

 <div className="card-body">
 
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-12">
         {/* general form elements */}
         <div className="card card-primary">
           <div className="card-header">
             <h3 className="card-title">Create Fish</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body">
               
               <div className="row">
           
             <div className="form-group col-md-6">
                 <label >Fish Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="name"
                  onChange={(e) => handle(e)}
                  value={data.name}
                  placeholder="Fish Name" />
               </div>
               <p style={{color:"red"}}>{formErrors.name}</p> 
               </div>
               
            {/* /.col */}
              
              <div className="card-footer">
              <button type="submit" className="btn btn-primary btn-block"  style={{width:"130px"}}>Add</button>
            </div>
            {/* /.col */}
         
             </div>

           </form>
           
         </div>
         {/* /.card */}</div>
     </div>
     </div>
    </div>
    </div>
  )
}

export default CreateFish