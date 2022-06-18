import React, { useEffect, useState,useRef } from "react";
import { Route, Routes } from "react-router-dom";



import AddMembers from "../AddMembers";
import EditPriceForm from "../EditPriceForm";
import EditUserData from "../EditUserData";
import EditUserForm from "../EditUserForm";
import EditUserStatus from "../EditUserStatus";
import Footer from "../Footer";
import Header from "../Header";
import Logout from "../Logout";
import ResetPassword from "../ResetPassword";
import AdminHome from "./AdminComponents/AdminHome";
import AdminSideNav from "./AdminComponents/AdminSideNav";
import CreatePrice from "./AdminComponents/PriceList/CreatePrice";
import CreateUser from "./AdminComponents/CreateUser";
import CreateFish from "./AdminComponents/fish/CreateFish";
import EditFishForm from "./AdminComponents/fish/EditFishForm";
import ListFish from "./AdminComponents/fish/ListFish";
import ListFishCatch from "./AdminComponents/FishCatch/ListFishCatch";
import CreateRequest from "./AdminComponents/fishingrequest/CreateRequest";
import EditFishingRequest from "./AdminComponents/fishingrequest/EditFishingRequest";
import ListFishingRequest from "./AdminComponents/fishingrequest/ListFishingRequest";
import ListPrice from "./AdminComponents/PriceList/ListPrice";
import ListUserData from "./AdminComponents/ListUserData";
import ListUserDataForm from "./AdminComponents/ListUserDataForm";
import Uploadid from "./AdminComponents/UploadID/Uploadid";
import Listuseridcard from "./AdminComponents/UserId/Listuseridcard";
import{Url} from "../../constants/global"
import Axios from "axios";
import RejectedUser from "./AdminComponents/Rejected/RejectedUser";
import AddFish from "./AdminComponents/FishCatch/AddFish";
import OpenReqList from "./AdminComponents/userRequest/OpenReqList";
import CloseReqList from "./AdminComponents/userRequest/CloseReqList";

function AdminMain({details,setdetails}) {
  const [lim, setlim] = useState(0);
  const [page, setPage] = useState(1);
  const [pricepage, setpricePage] = useState(1);
  const [activetog, setactivetog] = useState(true);
  const [del, setdel] = useState(0);
  const [edit, setedit] = useState(0);
  const [editprice, seteditprice] = useState(0)
  const [editfish, seteditfish] = useState(0)
  const isMounted4 = useRef(false);
  const [search, setSearch] = useState(false);
  const [sideNavSel, setSideNavSel] = useState("dashboard");
  const [list2, setlist2] = useState("nothing");
  const [sucess, setsucess] = useState({color:"",statusmsg:"",createuser:false,
  createcard:false})
 // const [name, setname] = useState(usrname);
 var loggedUser = JSON.parse(localStorage.getItem("data"));
 useEffect(()=>{
    
  listUser();

},[]);
function listUser(){
  console.log("shdvbajhdb")
  Axios.post(
    Url.userdetailsurl,
    { user_id: loggedUser.id,
      req_user_id:loggedUser.id,
    },
    { headers: { Token: loggedUser.api_token } }
  ).then((res) => {
    
    //param.setdetails({name:res.data.data.username, photo:res.data.photo})
    if(res.data.photo=="http://work.phpwebsites.in/fishing/public/uploads/medium"){
            setdetails({username:res.data.data.username,
              name:res.data.data.name,
              id:res.data.data.id,
              email:res.data.data.email,
              mobile:res.data.data.mobile,
              status:res.data.data.status,
              photo:null});
            console.log("1")
          }
          else{
            setdetails({username:res.data.data.username,
              name:res.data.data.name,
              id:res.data.data.id,
              email:res.data.data.email,
              mobile:res.data.data.mobile,
              status:res.data.data.status,
              photo:res.data.photo});
            console.log("2")
          }
         
            const reloadCount = sessionStorage.getItem('reloadCount');
            if(reloadCount < 2) {
              sessionStorage.setItem('reloadCount', String(reloadCount + 1));
              window.location.reload();
            } else {
              sessionStorage.removeItem('reloadCount');
            }
          
  });
}

  return (
    <div>
      <Header details={details} setdetails={setdetails}  />
      <AdminSideNav setlim={setlim} details={details} page={page} activetog={activetog} edit={edit} del={del} isMounted4={isMounted4} setSideNavSel={setSideNavSel} sideNavSel={sideNavSel} />
      <Routes>
        <Route path="home" element={<AdminHome page={page} setlim={setlim} setSideNavSel={setSideNavSel}/>} />
        <Route path="settings/edituserdata" element={<EditUserData details={details} setdetails={setdetails} setSideNavSel={setSideNavSel} edit={edit} setedit={setedit} sucess={sucess} setsucess={setsucess}/>} />
        <Route path="/edituserform" element={<EditUserForm edit={edit} setedit={setedit} sucess={sucess} setsucess={setsucess} />} />
        <Route path="/editpriceform" element={<EditPriceForm editprice={editprice} seteditprice={seteditprice} sucess={sucess} setsucess={setsucess}/>} />
        <Route path="settings/resetpassword" element={<ResetPassword setSideNavSel={setSideNavSel} setsucess={setsucess}/>}  />
        <Route path="settings/edituserstatus" element={<EditUserStatus />} />
        <Route path="/createuser" element={<CreateUser setsucess={setsucess} sucess={sucess}/>} />
        <Route path="logout" element={<Logout/>} />
        <Route path="settings/addmembers" element={<AddMembers/>} />
        <Route path="listuserdataform" element={<ListUserDataForm />} />
        <Route path="listuserdata" element={<ListUserData setsucess={setsucess} sucess={sucess} lim={lim} page={page} setPage={setPage} activetog={activetog} setSideNavSel={setSideNavSel} setactivetog={setactivetog} del={del} setdel={setdel} search={search} setSearch={setSearch} list2={list2} setList2={setlist2}/>} />
        <Route path="listprice" element={<ListPrice pricepage={pricepage} setpricePage={setpricePage} setSideNavSel={setSideNavSel} sucess={sucess} setsucess={setsucess} />} />
        <Route path="createprice" element={<CreatePrice sucess={sucess} setsucess={setsucess}/>} />
        <Route path="listfish" element={<ListFish setSideNavSel={setSideNavSel}  sucess={sucess} setsucess={setsucess}/>} />
        <Route path="createfish" element={<CreateFish  sucess={sucess} setsucess={setsucess}/>} />
        <Route path="/editfishform" element={<EditFishForm editfish={editfish} seteditfish={seteditfish} sucess={sucess} setsucess={setsucess}/>} />
        <Route path="createrequest" element={<CreateRequest setSideNavSel={setSideNavSel} sucess={sucess} setsucess={setsucess}/>} />
        <Route path="listfishingrequest" element={<ListFishingRequest setSideNavSel={setSideNavSel} sucess={sucess} setsucess={setsucess}/>} />
        <Route path="/editfishreq" element={<EditFishingRequest sucess={sucess} setsucess={setsucess}/>} />
        <Route path="listfishcatch" element={<ListFishCatch setSideNavSel={setSideNavSel}/>} />
       {// <Route path="/uploadid" element={<Uploadid setSideNavSel={setSideNavSel}/>} />
  }
  <Route path="openreqlist" element={<OpenReqList setSideNavSel={setSideNavSel}/>} />
  <Route path="closereqlist" element={<CloseReqList setSideNavSel={setSideNavSel}/>} />
        <Route path="/listidcard" element={<Listuseridcard setSideNavSel={setSideNavSel}/>} />
        <Route path="rejecteduser" element={<RejectedUser setSideNavSel={setSideNavSel}/>} />
        <Route path="addfishcaught" element={<AddFish sucess={sucess} setsucess={setsucess}/>} />
        
      </Routes>
      {/*
                
                <Route path="settings/edituserstatus" element={<EditUserStatus/>}/>
                <Route path="settings/changepassword" element={<ResetPassword/>}/>
      */}
    
      <Footer />
    </div>
  );
}

export default AdminMain;
