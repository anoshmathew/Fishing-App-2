import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Url} from '../../../../constants/global'

function CreateRequest() {
    const navigate = useNavigate();
  var loggedUser = JSON.parse(localStorage.getItem("data"));

  var msg;
  
  const token = loggedUser.api_token;
  const [data, setData] = useState({  
    //user_id:"",
    name: "",   
    email:"",
    mobile:"",
    house_name:"",
    street:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    price_id:"",
    start_date:""
   
  });
  function submit(e) {
    e.preventDefault();
    console.log(loggedUser.id)
    if(data.name!=""){

    console.log(data);
    Axios.post(Url.createfishrequrl, {
        user_id: loggedUser.id ,
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
        start_date:data.start_date   , 
    },{ headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      console.log(res);
      //navigate("../listfish");
    });
  }
  
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  return (
    <div><div className="content-wrapper justify-content-left mt-5">

    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Add Fishing Request</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="">Admin</a></li>
              <li className="breadcrumb-item active">Add Fishing Request</li>
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
                     <label >Name</label>
                     <input  className="form-control" 
                      type="text"
                      id="name"
                      onChange={(e) => handle(e)}
                      value={data.name}
                      placeholder="Fish Name" />
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
                 <label >Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="mobile"
                  onChange={(e) => handle(e)}
                  value={data.mobile}
                  placeholder="mobile" />
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
                 <label>Street</label>
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
                 <label>State</label>
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
                  placeholder="Fish Name" />
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
                  placeholder="Fish Name" />
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
    </div>
  )
}

export default CreateRequest