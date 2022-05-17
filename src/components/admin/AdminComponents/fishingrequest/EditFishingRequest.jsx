import React, { useState,useEffect } from 'react'
import Axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";

function EditFishingRequest(param) {
    const url = "http://work.phpwebsites.in/fishing/api/editfishreq";
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    const location = useLocation()
    const itm = location.state;
    const navigate = useNavigate();
    
   
    const [data, setData] = useState({
      
   
    name: itm.name,   
    email:itm.email,
    mobile:itm.mobile,
    house_name:itm.house_name,
    street:itm.street,
    city:itm.city,
    state:itm.state,
    country:itm.country,
    pincode:itm.pincode,
    price_id:itm.price_id,
    start_date:itm.start_date
      
    });
    const [formErrors, setformErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    
   
    function submit(e) {
      e.preventDefault();
      setformErrors(validate(data));
      setIsSubmit(true);
      
          const token = loggedUser.api_token;
          console.log("From Local Storage");
          console.log("loggedUser Token: ", token);      
          Axios.post(
            url,
            {
              user_id: loggedUser.id ,
              req_id:itm.id,
              name: data.name,   
              email:data.email,
              mobile:data.mobile,
              house_name:data.house_name,
              street:data.street,
              city:data.city,
              state:data.state,
              country:data.country,
              pincode:data.pincode,
              price_id:data.price_id,
              start_date:data.start_date, 
            },
            { headers: { Token: token } }
          ).then((res) => {  
              console.log(res)       
              //param.setEditFishingReq(!param.EditFishingReq);
                    
              if(res.data.status == "yes"){
                param.setsucess({...param.sucess,color:"success",statusmsg:"Fish Request Added", createuser:true})
                navigate("../listfishingrequest");
               
              }
              else{
                param.setsucess({...param.sucess,color:"danger",statusmsg:"Error", createuser:false})
              }        
          });
         
      
      
    }
  
    
  
  
    const validate = (values) => {
      const errors = {};
      //const regex ;
      if(!data.name){
        errors.name = "Fish Name is required!"
       
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
    <div>
        <div className="content-wrapper justify-content-left mt-5">

<div className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0 text-dark">Edit Fishing Request</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Edit Fishing Request</li>
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
             <h3 className="card-title">Edit Fishing Request</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body" style={{ width: '28rem' }}>
              
               <div className="form-group col-md-6">
                 <label >Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="name"
                  onChange={(e) => handle(e)}
                  value={data.name}
                  placeholder="Name" />
               </div>     
               <div className="form-group col-md-6">
                 <label >Email</label>
                 <input  className="form-control" 
                  type="text"
                  id="email"
                  onChange={(e) => handle(e)}
                  value={data.email}
                  placeholder="Email" />
               </div>     
               <div className="form-group col-md-6">
                 <label>Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="mobile"
                  onChange={(e) => handle(e)}
                  value={data.mobile}
                  placeholder="Mobile" />
               </div>               
               <div className="form-group col-md-6">
                 <label >House Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="house_name"
                  onChange={(e) => handle(e)}
                  value={data.house_name}
                  placeholder="House Name" />
               </div>     
               <div className="form-group col-md-6">
                 <label >Street</label>
                 <input  className="form-control" 
                  type="text"
                  id="street"
                  onChange={(e) => handle(e)}
                  value={data.street}
                  placeholder="Street" />
               </div>  
               <div className="form-group col-md-6">
                 <label >City</label>
                 <input  className="form-control" 
                  type="text"
                  id="city"
                  onChange={(e) => handle(e)}
                  value={data.city}
                  placeholder="City" />
               </div>  
               <div className="form-group col-md-6">
                 <label >State</label>
                 <input  className="form-control" 
                  type="text"
                  id="state"
                  onChange={(e) => handle(e)}
                  value={data.state}
                  placeholder="State" />
               </div> 
               <div className="form-group col-md-6">
                 <label >Country</label>
                 <input  className="form-control" 
                  type="text"
                  id="country"
                  onChange={(e) => handle(e)}
                  value={data.country}
                  placeholder="Country" />
               </div>
               <div className="form-group col-md-6">
                 <label >Pincode</label>
                 <input  className="form-control" 
                  type="text"
                  id="pincode"
                  onChange={(e) => handle(e)}
                  value={data.pincode}
                  placeholder="Pincode" />
               </div>
               <div className="form-group col-md-6">
                 <label >Price ID</label>
                 <input  className="form-control" 
                  type="text"
                  id="price_id"
                  onChange={(e) => handle(e)}
                  value={data.price_id}
                  placeholder="Price ID" />
               </div>
               <div className="form-group col-md-6">
                 <label >Start Date</label>
                 <input  className="form-control" 
                  type="date"
                  id="start_date"
                  onChange={(e) => handle(e)}
                  value={data.start_date}
                  placeholder="Start Date" />
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
    </div>
  )
}

export default EditFishingRequest