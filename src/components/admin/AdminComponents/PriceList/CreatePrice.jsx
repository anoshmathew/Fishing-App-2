import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreatePrice({sucess, setsucess}) {
  const navigate = useNavigate();
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const [formErrors, setformErrors] = useState({});
  var msg;
  const url = "http://work.phpwebsites.in/fishing/api/pricecreate";
  const token = loggedUser.api_token;
  const [data, setData] = useState({  
    days: "",
    name: "",    
    price: "",
    type: "",
  });
  function submit(e) {
    e.preventDefault();
    console.log(loggedUser.id)
    setformErrors(validate(data));
    if((data.days!="")&&(data.name!="")&&(data.price!="")&&(data.type!="")){

      console.log(data);
      Axios.post(url, {
        user_id: loggedUser.id ,
        days: data.days,
        price: data.price,
        card_name: data.name,
        card_type: data.type,
      },{ headers: { Token: loggedUser.api_token } }
      ).then((res) => {
        console.log(res.data);
        
        if(res.data.status == "yes"){
          setsucess({...sucess,color:"success",statusmsg:"Price Created", createuser:true})
          navigate("../listprice");
          //Alert.success('Success Alert')
        }
        else{
          setsucess({...sucess,color:"danger",statusmsg:"Error", createuser:false})
        }
      });
    }
  }

  const validate = (values) => {
    const errors = {};
    //const regex ;
    if(!data.name){
      errors.name = "Card name is required!"
      errors.flag1="";
    }
    else
    {
      errors.flag1="checked";
    }
    if(!data.days){
      errors.days = "Enter number of days!"
      errors.flag2="";
    }
    else
    {
      errors.flag2="checked";
    }
    if(!data.price){
      errors.price = "Price is required!"
      errors.flag3="";
    }
    {
      errors.flag3="checked";
    }
    if(!data.type){
      errors.type = "Type is required!"
      errors.flag4="";
    }
    {
      errors.flag4="checked";
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
        <h1 className="m-0 text-dark">Add New Card</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">Add Card</li>
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
             <h3 className="card-title">Create New Price Card</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body">
               
               <div className="row">
           
             <div className="form-group col-md-6">
                 <label >Card Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="name"
                  onChange={(e) => handle(e)}
                  value={data.name}
                  placeholder="Name" />
                  <p style={{color:"red"}}>{formErrors.name}</p>
               </div>
               

               <div className="form-group col-md-6">
                 <label>Price</label>
                 <input  className="form-control" 
                 type="text"
                 id="price"
                 onChange={(e) => handle(e)}
                 value={data.price}
                  placeholder="Price" />
                  <p style={{color:"red"}}>{formErrors.price}</p>
               </div>
               
               </div>
               <div className="row">
               <div className="form-group col-md-6">
                 <label >Days</label>
                 <input  className="form-control" 
                  type="text"
                  id="days"
                  onChange={(e) => handle(e)}
                  value={data.days}
                  placeholder="Days" />
                  <p style={{color:"red"}}>{formErrors.days}</p>
               </div>
               
               
               <div className="form-group col-md-6">
                 <label >Type</label>
                 <select className="form-control" 
                   onChange={(e) => handle(e)} 
                   id="type" 
                   name="usertype" >
      <option value="">-- Select the User Type --</option>
      <option value="normal">Normal</option>
      <option value="yearly">Yearly</option>
    </select>
    <p style={{color:"red"}}>{formErrors.type}</p>
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
  );
}
export default CreatePrice;
