import React, { useState,useEffect } from 'react'
import Axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { Url} from '../../../../constants/global'

function EditFishForm(param) {

  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const location = useLocation()
  const itm = location.state;
  const navigate = useNavigate();
  
 
  const [data, setData] = useState({
    Fish_Name: itm.name,
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  console.log(itm.id);
 
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
          Url.editfishurl,
          {
            user_id: loggedUser.id,
            fish_id:itm.id,
            fish_name: data.Fish_Name
          },
          { headers: { Token: token } }
        ).then((res) => {  
            console.log(res)       
           // param.seteditfish(param.editfish+1);
            
            if(res.data.status == "yes"){
              param.setsucess({...param.sucess,color:"success",statusmsg:"Fish Added", createuser:true})
              navigate("../listfish"); 
             
            }
            else{
              param.setsucess({...param.sucess,color:"danger",statusmsg:"Error", createuser:false})
            }             
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
           <div className="col-md-12">
             {/* general form elements */}
             <div className="card card-primary">
               <div className="card-header">
                 <h3 className="card-title">Fish Details</h3>
               </div>
               {/* /.card-header */}
               {/* form start */}
               <form onSubmit={(e)=>submit(e)}>
                 <div className="card-body" >
                   
                   
    
                 
                   <div className="form-group col-md-6">
                     <label >Fish Name</label>
                     <input  className="form-control" 
                     type="text"
                     id="Fish_Name"
                     onChange={(e) => handle(e)}
                     value={data.Fish_Name}
                     placeholder="Fish Name" />
                     <p style={{color:"red"}}>{formErrors.fishname}</p>
                   </div>
                   
                   
    
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