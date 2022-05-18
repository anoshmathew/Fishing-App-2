import React, { useState, useRef,useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import man from '../img/avatar5.png'
import{Url} from "../constants/global"

//import './css/EditUserData.css'

function EditUserData(param) {
  console.log(param.details.photo)
  const isMounted1 = useRef(false);
  const isMounted2 = useRef(false);
  
  var loggedUser = JSON.parse(localStorage.getItem("data"));
  const navigate = useNavigate();
  console.log("loggedUser id: ", loggedUser.id);
  const [edit, setedit] = useState(false)
  const[userdetails,setuserdetails]=useState({
    username:"",
    name:"",
    id:"",
    email:"",
    mobile:"",
    status:"",
    photourl:""
  });
  const [data, setData] = useState({
    User_ID: loggedUser.id,
    Email: loggedUser.email,
    Mobile: loggedUser.mobile,
    UserName: loggedUser.username,
    Name: loggedUser.name,
    file:"",
  });
  if(param.sucess.createuser===true){
    setTimeout(() => {
      param.setsucess({...param.sucess, createuser:false,statusmsg:""})
    }, 3000)
  }
  const [file, setfile] = useState();
 // const [pic, setpic] = useState();
 param.setSideNavSel("myprofile")
 useEffect(()=>{
  listUser();

},[]);
useEffect(()=>{
  if (isMounted1.current){
    listUser();
  }
  else {
    isMounted1.current = true;
  }
},[edit]);



function listUser(){
  console.log(param.sucess)
  Axios.post(
    Url.userdetailsurl,
    { user_id: loggedUser.id
    },
    { headers: { Token: loggedUser.api_token } }
  ).then((res) => {
    let li = res.data.data;
    console.log(res);
    if(res.data.photo=="http://work.phpwebsites.in/fishing/public/uploads/medium"){
        param.setdetails({name:res.data.data.username,photo:null})
      }
      else{
        param.setdetails({name:res.data.data.username,photo:res.data.photo});
      }
    setuserdetails({
      username:li.username,
      name:li.name,
      id:li.id,
      email:li.email,
      mobile:li.mobile,
      status:li.status,
      photourl:res.data.photo
      
    });
    
  });
}

  function submit(e) {
    e.preventDefault();
    
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      console.log("From Local Storage");
      console.log("loggedUser Token: ", token);
      Axios.post(
        Url.edituserurl,
        {
          user_id: loggedUser.id,
          email: data.Email,
          mobile: data.Mobile,
          username: data.UserName,
          name: data.Name
         
        },
        { headers: { Token: token } }
      ).then((res) => {
        var info = res.data.data;
        console.log(res);
       
        //setedit(!edit);
        param.setsucess({statusmsg:"Edited", createuser:true})

        
        //navigate("../listuserdata");
        //window.location.reload();  
      });
      
    } else {
      console.log("Local Storage is Empty");
    }
  }
  function handlefile(e) {
    const filedata = { ...file };
    filedata[e.target.id] = e.target.value;
    setfile(filedata);
    console.log(filedata);
  }
  var bodyFormData = new FormData();
  const [picture, setPicture] = useState(null);
  const uploadPicture = (e) => {

         e.preventDefault();
        /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
        setPicture(e.target.files[0])
        console.log(e.target.files[0]);
       // setpic(URL.createObjectURL(e.target.files[0]))
       
 
};
if(picture != null){

  const token = loggedUser.api_token;
  bodyFormData.append('user_id', loggedUser.id);
  bodyFormData.append('photo', picture);
 
  console.log(picture); 
  Axios.post(
    Url.uploadphotourl,
    bodyFormData,
    { headers: {  
      Token: token,
     
    } 
  }
  ).then((res) => {
    console.log(res);
   setedit(!edit);
   setPicture() 
  });
}

  function handleUpload(e) {
    e.preventDefault();
    
    if (loggedUser != null) {
      const token = loggedUser.api_token;
      bodyFormData.append('user_id', loggedUser.id);
      bodyFormData.append('photo', picture);
     
      console.log(picture);
      
      Axios.post(
        Url.uploadphotourl,
        bodyFormData,
        { headers: {  
          Token: token,
         // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          //'Content-Type': 'multipart/form-data'
        } 
      }
      ).then((res) => {
        console.log(res);
       setedit(!edit);
       setPicture()
       // navigate("../listuserdata");
       //window.location.reload();
        
      });
    }
    else {
      console.log("Local Storage is Empty");
    }
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  const fileRef = useRef();

  return (
    <div className="content-wrapper justify-content-left mt-5">
<div className={"alert alert-success alert-dismissable " + (param.sucess.createuser?"":"hide")} style={{position: "absolute","z-index":"2","width":"100%"}}>
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
        <h1 className="m-0 text-dark">My Profile</h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="">Admin</a></li>
          <li className="breadcrumb-item active">My Profile</li>

        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
  </div>


<section className="content">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-12 mx-auto">
         {/* general form elements */}
         <div className="card card-warning">
           <div className="card-header">
             <h3 className="card-title">My Profile</h3>
           </div>

          <div className="card-body text-center">
            
          <div className="row">
          <div className="col-md-6">
            <img src={param.details.photo!=null?param.details.photo:man} alt={man} className="brand-image img-circle elevation-3" style={{width:"200px" ,height:"200px"}} />
             

            <button onClick={()=>fileRef.current.click()} style={{"position":"absolute","border":"1px solid black","borderRadius":"50%","marginLeft":"-123px","marginTop":"75px","width":"50px","height":"50px","backgroundColor":"rgba(0, 0, 0, 0.33)"}}><i className="ion ion-upload nav-icon" style={{"fontSize":"25px", "color":"white"}}/></button>
            <input type="file" name="file" id="file" onChange={(e)=>uploadPicture(e)} style={{width:"100%",}} ref={fileRef} hidden/>
                         
          </div>
          
            <div className="col-md-6">
            <div className="row mt-4 text-left" style={{"fontWeight":"bold"}}>
        
            <table>
            <tbody>
            
  <tr>
    <td>Username</td>
    <td>:</td>
    <td>{userdetails.username}</td>
  </tr>
  <tr>
    <td>Name</td>
    <td>:</td>
    <td>{userdetails.name}</td>
  </tr>
  <tr>
    <td>Id</td>
    <td>:</td>
    <td>{userdetails.id}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>:</td>
    <td>{userdetails.email}</td>
  </tr>
  <tr>
    <td>Mobile</td>
    <td>:</td>
    <td>{userdetails.mobile}</td>
  </tr>
  <tr>
    <td>Status</td>
    <td>:</td>
    <td>{userdetails.status}</td>
  </tr>
  </tbody>
</table>
            </div>
              
             
            </div>
          </div>
          
         

          
          
          </div>
          </div>
          </div>
          </div>
          </div>
         
 </section>


 <div className="card-body text-center">
 <div className="row">
 <div className="col-12">
    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Edit Profile</button>
  </div>
  </div>
  </div>

 <section className="content collapse multi-collapse" id="multiCollapseExample2">
   <div className="container-fluid">
     <div className="row">
       <div className="col-md-12 mx-auto">
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
                 <label >Name</label>
                 <input  className="form-control" 
                  type="text"
                  id="Name"
                  onChange={(e) => handle(e)}
                  value={data.Name}
                  placeholder="Name" />
               </div>
               <div className="form-group col-md-6">
                 <label >Username</label>
                 <input  className="form-control" 
                 type="text"
                 id="UserName"
                 onChange={(e) => handle(e)}
                 value={data.UserName}
                  placeholder="User Name"/>
               </div>
               </div>
               <div className="row">
               <div className="form-group col-md-6">
                 <label >Mobile</label>
                 <input  className="form-control" 
                  type="text"
                  id="Mobile"
                  onChange={(e) => handle(e)}
                  value={data.Mobile}
                  placeholder="Mobile" />
               </div>
               <div className="form-group col-md-6">
                 <label >Email</label>
                 <input  className="form-control" 
                 type="text"
                 id="Email"
                 onChange={(e) => handle(e)}
                 value={data.Email}
                  placeholder="Email" />
               </div>
               </div>



               
             </div>

             <div className="card-footer">
               <button type="submit" className="btn btn-primary">Submit</button>
             </div>

           </form>
           
         </div>
         {/* /.card */}</div>
     </div>
     </div>
     </section>


      
    
    </div>
  );
}

export default EditUserData;
