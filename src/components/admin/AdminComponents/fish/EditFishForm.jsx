import React, { useState,useEffect } from 'react'
import Axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";

function EditFishForm(param) {

  const url = "http://work.phpwebsites.in/fishing/api/editfish";
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const location = useLocation()
  const itm = location.state;
  const navigate = useNavigate();
  
 
  const [data, setData] = useState({
    Fish_Name: itm.name,
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  
 
  function submit(e) {
    e.preventDefault();
    setformErrors(validate(data));
    setIsSubmit(true);
    if(data.Fish_Name != ""){
      if (loggedUser != null) {
        const token = loggedUser.api_token;
        console.log("From Local Storage");
        console.log("loggedUser Token: ", token);      
        Axios.post(
          url,
          {
            user_id: loggedUser.id,
            fish_name: data.Fish_Name
          },
          { headers: { Token: token } }
        ).then((res) => {  
            console.log(res)       
            param.seteditfish(param.editfish+1);
            navigate("../listfish");            
        });
        } 
        else{
            console.log("Local Storage is Empty");
        }
    }
    
  }

  


  const validate = (values) => {
    const errors = {};
    //const regex ;
    if(!data.Fish_Name){
      errors.fishname = "Fish Name is required!"
    }
    else
    {
      errors.flag1="checked";
    }
   
    return errors;

  };

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
            <h1 className="m-0 text-dark">Edit Fish</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="">Admin</a></li>
              <li className="breadcrumb-item active">Edit Fish</li>
            </ol>
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    
     <div className="card-body">
     
       <div className="container-fluid">
         <div className="row">
           <div className="col-md-8">
             {/* general form elements */}
             <div className="card card-primary">
               <div className="card-header">
                 <h3 className="card-title">Fish Details</h3>
               </div>
               {/* /.card-header */}
               {/* form start */}
               <form onSubmit={(e)=>submit(e)}>
                 <div className="card-body" style={{ width: '28rem' }}>
                   
                   
    
                 
                   <div className="form-group col-xs-12">
                     <label >Fish Name</label>
                     <input  className="form-control" 
                     type="text"
                     id="Fish_Name"
                     onChange={(e) => handle(e)}
                     value={data.Fish_Name}
                     placeholder="Fish Name" />
                   </div>
                   <p style={{color:"red"}}>{formErrors.fishname}</p>
                   
    
                 <div className="card-footer">
                   <button type="submit" className="btn btn-primary">Save</button>
                 </div>
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

export default EditFishForm