import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate,useLocation } from "react-router-dom";
import {Url} from "../../../../constants/global"

function AddFish(param) {
  const navigate = useNavigate();
  var lst;
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const [formErrors, setformErrors] = useState({});
  var msg;
  var arr = [{card_name: "--Select a Card--"}];
 
  const location = useLocation()
  var itm = location.state;
  const token = loggedUser.api_token;
  const [fishlist, setfishlist] = useState(arr)
  const [data, setData] = useState({  
   
    fish_id: "",   
    fish_count:"",
    fish_weight:"",
    req_id:itm.id,
  });
  console.log(itm)
  
  const validate = (values) => {
    const errors = {};
    //const regex ;
    if(data.fish_id == null){
      errors.fish_id = "Fish id is required!"
      errors.flag1="checked";
    }
    else{
      errors.flag1="";
    }
    if(data.fish_count == null){
      errors.fish_count = "Fish count is required!"
      errors.flag2="checked";
    }
    else{
      errors.flag2="";
    }
    if(data.fish_weight == null ){
      errors.fish_weight = "Fish weight is required!"
      errors.flag3="checked";
    }
    else{
      errors.flag3="";
    }
    return errors;
  }
useEffect(() => {
  getfishlist()
}, [])

function getfishlist(){
  
  Axios.post(Url.catchfishlisturl, {
    user_id: loggedUser.id ,
    limit:1,
  },{ headers: { Token: loggedUser.api_token } }
  ).then((res) => {
   console.log(res)
   setfishlist([...arr, ...res.data.data])
  });
}
if(fishlist!=null){
  console.log(fishlist)
  lst = fishlist.filter((item)=>(item.fish_name != null)).map((item) =>
  <option key={item.id} value={JSON.stringify(item)}>{item.fish_name}</option>
  )
}

  function submit(e) {
    e.preventDefault();
    var fish_data_obj =JSON.parse(data.fish_data);
    console.log(fish_data_obj)
    setformErrors(validate(data));
    
   // if((Object.entries(formErrors).length !== 0)&&(formErrors.flag1=="checked")&&(formErrors.flag2=="checked")&&(formErrors.flag3=="checked")&&(formErrors.flag4=="checked")){

    console.log(data);
    console.log(itm.id);
    Axios.post(Url.addfishcaught, {
      user_id: loggedUser.id ,
      fish_id: fish_data_obj.fish_id, 
      fish_count: data.fish_count,   
      fish_weight: data.fish_weight, 
      req_id: itm.id,
    },{ headers: { Token: loggedUser.api_token } }
    ).then((res) => {
     console.log(res)
      if(res.data.status == "yes"){
        //param.setsucess({...param.sucess,color:"success",statusmsg:"Fish Created", createuser:true})
        navigate("../listfishcatch", {state:{itm}});
        //Alert.success('Success Alert')
      }
      else{
        //param.setsucess({...param.sucess,color:"danger",statusmsg:"Error!!", createuser:false})
      }
    });
  //}
  
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
             <h3 className="card-title">Add Fish Caught</h3>
           </div>
           {/* /.card-header */}
           {/* form start */}
           <form onSubmit={(e)=>submit(e)}>
             <div className="card-body">
               
               <div className="row">
               <div className="form-group col-md-12">
                 <label >Fish Name</label>
                  <select className="form-control" style={{color:"rgb(143, 143, 143)"}} onChange={(e) => handle(e)} id="fish_data" >
                  {lst}
                </select>
                 </div>
             
               <div className="form-group col-md-6">
                 <label >Fish Count</label>
                 <input  className="form-control" 
                  type="text"
                  id="fish_count"
                  onChange={(e) => handle(e)}
                  value={data.fish_count}
                  placeholder="Fish Count" />
                  
                  <p style={{color:"red"}}>{formErrors.fish_count}</p> 
               </div>
               
               </div>
               <div className="row">
           
             <div className="form-group col-md-6">
                 <label >Fish Weight (Kg)</label>
                 <input  className="form-control" 
                  type="text"
                  id="fish_weight"
                  onChange={(e) => handle(e)}
                  value={data.fish_weight}
                  placeholder="Fish Weight" />
                  
                  <p style={{color:"red"}}>{formErrors.name}</p> 
               </div>
              {/*} <div className="form-group col-md-6">
                 <label >Req ID</label>
                 <input  className="form-control" 
                  type="text"
                  id="req_id"
                  onChange={(e) => handle(e)}
                  value={data.req_id}
                  placeholder="Req ID" />
                  <br/>
                  <p style={{color:"red"}}>{formErrors.name}</p> 
               </div>
  */}
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

export default AddFish