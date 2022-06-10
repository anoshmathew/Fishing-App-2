import React, { useState,useEffect,useRef } from "react";
import Axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { Url } from '../../../../constants/global'
import Modal from '@material-ui/core/Modal';

function WaitingForApproval() {
  
    var loggedUser = JSON.parse(localStorage.getItem("data"));
    var bodyFormData = new FormData();
    const [open, setOpen] = useState(false)
    const [imagelink, setimagelink] = useState(null)
  const [picture, setPicture] = useState(null);
  const [tog, settog] = useState(false)
  const handleClose = () => {
    setOpen(false);
  };
    
  const handleOpen = () => {
    setOpen(true);
  };
  const uploadPicture = (e) => {
   // e.preventDefault();
        /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
        
        setPicture(e.target.files[0])
        console.log(e.target.files);
       // setpic(URL.createObjectURL(e.target.files[0]))
    
};
useEffect(() => {
  loadImage()
}, [tog])

console.log(loggedUser)
function loadImage(){
  console.log("Loading Image")
  Axios.post(
    Url.listidcardurl,
    { user_id: loggedUser.id,req_user_id:loggedUser.id, limit:1},
    { headers: { Token: loggedUser.api_token } }
  ).then((res) => {
    console.log(res.data.data[0].small)
      if(res.data.data[0].small != null){
        setimagelink(res.data.data[0])
      }
      
      
    
  }
  )
  
}

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
    settog(!tog)
   } 
  });
}


  const fileRef = useRef();


  return (

    



   <div className="container-fluid">
     <div style={{ display: 'block'}}>
     <Modal
        onClose={handleClose}
        open={open}
        style={{
          position: 'absolute',
          border: '2px solid #000',
          
          boxShadow: '2px solid black',
          height:"80%",
          width: "80%",
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '5%',
         
        }}
      >
        {imagelink != null ? <img src={imagelink.large} style={{height:"100%", width: "100%", objectFit: "contain",cursor:"pointer"}} onClick={handleClose} /> :null}
      
      </Modal>
      </div>
     <div className="row">
       <div className="col-md-12">
         {/* general form elements */}
         <div className="card card-primary">
           <div className="card-header">
             <h3 className="card-title">Waiting for Approval!</h3>
           </div>
           {/* /.card-header */}
           <div className="card-body">
               
            
            
               
               {/* form start */}
               
               <div className="col-md-12" style={{padding:"20px"}}>
          <div className="box-main" style={{width:"50%",height:"35vh",display:"flex",justifyContent:"center",alignItem:"center",marginLeft:"auto",marginRight:"auto"}}>
          {imagelink != null ? <img src={imagelink.small} onClick={handleOpen} style={{height:"100%", width: "100%", objectFit: "contain",border:"2px dashed black" ,cursor:"pointer" }}/>:null}
            
          </div>
          <div className="upload-btn" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50px",margin:"auto auto"}}>
            <button className="btn btn-primary" onClick={()=>fileRef.current.click()}>Edit ID Card</button>
          </div>
            <input type="file" name="file" id="file" onChange={(e)=>uploadPicture(e)} ref={fileRef} hidden/>      
          </div>
  


     
      

           </div>
    </div>
          
          
         </div>
         {/* /.card */}</div>
     </div>
     
 
  
  );
}
export default WaitingForApproval;
