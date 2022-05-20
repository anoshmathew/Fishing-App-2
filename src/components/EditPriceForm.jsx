import React, { useState,useEffect } from 'react'
import Axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { Url} from '../constants/global'

function EditPriceForm(param) {

  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const location = useLocation()
  const itm = location.state;
  const navigate = useNavigate();

  const [data, setData] = useState({
    ID:itm.id,
    Price: itm.price,
    Type: itm.card_type,
    Card_Name: itm.card_name,
    Days: itm.days,
  });
  const [formErrors, setformErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);

  function submit(e) {
    e.preventDefault();
    setformErrors(validate(data));
    setIsSubmit(true);
    if((data.Price != "")&&(data.Type !="")&&(data.Card_Name != "")&&(data.Days!="")){
      if (loggedUser != null) {
        const token = loggedUser.api_token;
        console.log("From Local Storage");
        console.log("loggedUser Token: ", data);      
        Axios.post(
          Url.editpriceurl,
          {
            user_id: loggedUser.id,
            price_id: data.ID,
            card_name: data.Card_Name,
            price: data.Price,
            days: data.Days,
            card_type: data.Type
            
          },
          { headers: { Token: token } }
        ).then((res) => {  
            console.log(res)       
            param.seteditprice(param.editprice+1);
     
            if(res.data.status == "yes"){
              param.setsucess({...param.sucess,color:"success",statusmsg:"Price Created", createuser:true})
              navigate("../listprice");
             
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

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit)
  {

  }
  }, [formErrors])

  const validate = (values) => {
    const errors = {};
    //const regex ;
    if(!data.Card_Name){
      errors.cardname = "Username is required!"
     
    }
    else
    {
      errors.flag1="checked";
    }
    
    if(!data.Days){
      errors.days = "Days is required!"
    }
    {
      errors.flag2="checked";
    }
    if(!data.Price){
      errors.price = "Price is required!"
    }
    {
      errors.flag3="checked";
    }
    
    if(!data.Type){
      errors.type = "Type is required!"
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
            <h1 className="m-0 text-dark">Edit Member</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="">Admin</a></li>
              <li className="breadcrumb-item active">Edit User</li>
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
                 <h3 className="card-title">Edit Details</h3>
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
                     id="Card_Name"
                     onChange={(e) => handle(e)}
                     value={data.Card_Name}
                      placeholder="Card Name" />
                      <p style={{color:"red"}}>{formErrors.cardname}</p>
                   </div>
                   <div className="form-group col-md-6">
                     <label >Days</label>
                     <input  className="form-control" 
                      type="text"
                      id="Days"
                      onChange={(e) => handle(e)}
                      value={data.Days}
                      placeholder="Days" />
                      <p style={{color:"red"}}>{formErrors.days}</p>
                   </div>
                   </div>
                   <div className="row">
                   <div className="form-group col-md-6">
                     <label >Card Type</label>
                     <input  className="form-control" 
                      type="text"
                      id="Type"
                      onChange={(e) => handle(e)}
                      value={data.Type}
                      placeholder="Card Type" />
                      <p style={{color:"red"}}>{formErrors.type}</p>
                   </div>
                   
                   <div className="form-group col-md-6">
                     <label >Price</label>
                     <input  className="form-control" 
                     type="text"
                     id="Price"
                     onChange={(e) => handle(e)}
                     value={data.Price}
                      placeholder="Price" />
                    <p style={{color:"red"}}>{formErrors.price}</p>
                   </div>
                  
                   
                 </div>
                 </div>
                 <div className="card-footer">
                   <button type="submit" className="btn btn-primary">Save</button>
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

export default EditPriceForm