import React, { useState,useEffect,useRef } from "react";
import Axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { Url } from '../../../../constants/global'

function Uploadid({setuploaded , uploaded}) {
   // param.setSideNavSel("uploadid")
   
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    var bodyFormData = new FormData();
  const [picture, setPicture] = useState(null);
  const uploadPicture = (e) => {
   // e.preventDefault();
        /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
        
        setPicture(e.target.files[0])
        console.log(e.target.files);
       // setpic(URL.createObjectURL(e.target.files[0]))
    
};

if (picture != null) {
  const token = loggedUser.api_token;
  bodyFormData.append('user_id', loggedUser.id);
  bodyFormData.append('id_card', picture);
  console.log(picture);
  
  Axios.post(
    Url.uploadidurl,
    bodyFormData,
    { headers: {  
      Token: token,
    
    } 
  }
  ).then((res) => {
    console.log(res);
    setPicture()
   if(res.data.status=="yes"){
    //Url.listidcardurl
    setuploaded(!uploaded)
   }
    
  });
}


  const fileRef = useRef();
  return (
        
         
<>

           <div className="col-md-12">
             {/* general form element */}
             <div className="card card-primary">
               <div className="card-header">
                 <h3 className="card-title">Upload your ID Proof for verification</h3>
               </div>
               {/* /.card-header */}
               {/* form start */}
               
               <div className="col-md-12" style={{padding:"20px"}}>
          <div className="box-main" style={{width:"50%",height:"40vh",border:"2px dashed black" ,display:"flex",justifyContent:"center",alignItem:"center",marginLeft:"auto",marginRight:"auto"}}>
          <div className="upload-btn" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50px",margin:"auto auto"}}>
            <button className="btn btn-primary" onClick={()=>fileRef.current.click()}>Upload</button>
          </div>
          </div>
            <input type="file" name="file" id="file" onChange={(e)=>uploadPicture(e)} ref={fileRef} hidden/>      
          </div>
          </div>
             
             {/* /.card */}</div>
  </>
        


  )
}

export default Uploadid