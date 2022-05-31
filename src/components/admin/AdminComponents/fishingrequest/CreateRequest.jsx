import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Url} from '../../../../constants/global'

function CreateRequest(param) {
    const navigate = useNavigate();
  var loggedUser = JSON.parse(localStorage.getItem("data"));
console.log(loggedUser)
  var msg;
  useEffect(() => {
    param.setSideNavSel("createreq")
  }, [])
  
 
  
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
    console.log(data);
    console.log(loggedUser);
    
    Axios.post(Url.createfishrequrl, {
        user_id: loggedUser.id ,
        name: loggedUser.name,   
        email:loggedUser.email,
        mobile:loggedUser.mobile,
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
      if(res.data.status == "yes"){
        param.setsucess({...param.sucess,color:"success",statusmsg:"Fish Created", createuser:true})
       // navigate("../listfish");
        //Alert.success('Success Alert')
      }
      else{
        param.setsucess({...param.sucess,color:"danger",statusmsg:"Error!!", createuser:false})
      }
    });
  
  if(param.sucess.createuser===true){
    setTimeout(() => {
      param.setsucess({...param.sucess, createuser:false,statusmsg:""})
    }, 3000)
  }
  
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  return (
    <div><div className="content-wrapper justify-content-left mt-5">
   
       <div className={"alert alert-"+(param.sucess.color)+" alert-dismissable " + (param.sucess.createuser?"":"hide")} style={{position: "absolute","z-index":"2","width":"100%"}}>
			<button type="button" className="close" data-dismiss="alert" aria-hidden="true">
			<i className="ace-icon fa fa-times"></i>
			</button>
			<strong>
			<i className="ace-icon fa fa-check"></i>
			</strong>
      {param.sucess.statusmsg}<br/>
	    </div>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Add Fishing Request</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="">User</a></li>
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
                 <h3 className="card-title">Create Fishing Request</h3>
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
                      placeholder="Disabled" />
                   </div>
                   <div className="form-group col-md-6">
                 <label >Email</label>
                 <input  className="form-control" 
                  type="text"
                  id="email"
                  onChange={(e) => handle(e)}
                  value={data.email}
                  placeholder="Disabled" />
               </div>
               <div className="form-group col-md-6">
                 <label >Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="mobile"
                  onChange={(e) => handle(e)}
                  value={data.mobile}
                  placeholder="Disabled" />
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