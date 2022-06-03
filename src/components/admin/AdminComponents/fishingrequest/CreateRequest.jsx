import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Url} from '../../../../constants/global'

function CreateRequest(param) {
    const navigate = useNavigate();
   // const [list, setlist] = useState()
    var lst;
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  var arr = [{card_name: "--Select a Card--",
  card_type: "",
  days: null,
  id: null,
  price: null,
  status: "active"}
];
  const [priceCards, setpriceCards] = useState(arr)
  console.log(loggedUser)
  var msg;
  useEffect(() => {
    getcards();
  }, [])
  
 function getcards(){
 // param.setSideNavSel("listidcard")
  Axios.post(Url.pricelisturl, {
    user_id: loggedUser.id ,
    price_id: loggedUser.price_id,   
    limit:"1",
   
},{ headers: { Token: loggedUser.api_token } }
).then((res) => {
  console.log(res);
  setpriceCards([...arr, ...res.data.data])
  
});
 }

 if(priceCards != null){
  console.log(priceCards)
  lst = priceCards.map((item) =>
  <option key={item.id} value={JSON.stringify(item)}>{item.card_name}</option>
  )
 }
  
  const [data, setData] = useState({  
    //user_id:"",
    name: loggedUser.name,   
    email:loggedUser.email,
    mobile:loggedUser.mobile,
    house_name:loggedUser.house_name,
    street:loggedUser.street,
    city:loggedUser.city,
    state:loggedUser.state,
    country:loggedUser.country,
    pincode:loggedUser.pincode,
    price_id:loggedUser.price_id,
    start_date:loggedUser.start_date,
   
  });
  if(data != null){
    console.log(data)
  }
  function submit(e) {
    e.preventDefault();
    var priceObj =JSON.parse(data.price_id);
    console.log(priceObj)
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
        price_id:priceObj.id,
        start_date:data.start_date   , 
    },{ headers: { Token: loggedUser.api_token } }
    ).then((res) => {
      console.log(res);
      //navigate("../listfish");
      if(res.data.status == "yes"){
       // param.setsucess({...param.sucess,color:"success",statusmsg:"Fish Created", createuser:true})
       navigate("../openreqlist");
        //Alert.success('Success Alert')
        console.log("Confirm")
      }
      else{
        param.setsucess({...param.sucess,color:"danger",statusmsg:"Error!!", createuser:false})
      }
    });
    
  
 
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  return (
    
     
   
      
    
    
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
                 <div className="form-group col-md-12">
                 <label >Price Card</label>
                 <select className="form-control" style={{color:"rgb(143, 143, 143)"}} onChange={(e) => handle(e)} id="price_id" >
                  {lst}
                </select>
                 </div>
                 </div>

                {/*

                
                 <div className="form-group col-md-6">
                     <label >Price Id</label>
                     <input  className="form-control" 
                      type="text"
                      id="price_id"
                      onChange={(e) => handle(e)}
                      value={JSON.stringify(JSON.parse(data.price_id).id)}
                      placeholder="Disabled" />
                   </div>
  */
  }

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
        
      )
    
  
}

export default CreateRequest