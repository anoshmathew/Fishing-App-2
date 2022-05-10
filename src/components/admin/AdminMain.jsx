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

function AdminMain({usrname,setusrname}) {
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
  const [sucess, setsucess] = useState({statusmsg:"",createuser:false,
  createcard:false})
  const [name, setname] = useState(usrname);
  return (
    <div>
      <Header name={name}  />
      <AdminSideNav setlim={setlim} name={name} setname={setname} page={page} activetog={activetog} edit={edit} del={del} isMounted4={isMounted4} setSideNavSel={setSideNavSel} sideNavSel={sideNavSel} />
      <Routes>
        <Route path="home" element={<AdminHome page={page}  setlim={setlim} setSideNavSel={setSideNavSel}/>} />
        <Route path="settings/edituserdata" element={<EditUserData name={name} setname={setname} setSideNavSel={setSideNavSel} edit={edit} setedit={setedit}/>} />
        <Route path="/edituserform" element={<EditUserForm edit={edit} setedit={setedit} />} />
        <Route path="/editpriceform" element={<EditPriceForm editprice={editprice} seteditprice={seteditprice} />} />
        <Route path="settings/resetpassword" element={<ResetPassword setSideNavSel={setSideNavSel}/>}  />
        <Route path="settings/edituserstatus" element={<EditUserStatus />} />
        <Route path="/createuser" element={<CreateUser setsucess={setsucess} sucess={sucess}/>} />
        <Route path="logout" element={<Logout/>} />
        <Route path="settings/addmembers" element={<AddMembers/>} />
        <Route path="listuserdataform" element={<ListUserDataForm />} />
        <Route path="listuserdata" element={<ListUserData setsucess={setsucess} sucess={sucess} lim={lim} page={page} setPage={setPage} activetog={activetog} setSideNavSel={setSideNavSel} setactivetog={setactivetog} del={del} setdel={setdel} search={search} setSearch={setSearch} list2={list2} setList2={setlist2}/>} />
        <Route path="listprice" element={<ListPrice pricepage={pricepage} setpricePage={setpricePage} setSideNavSel={setSideNavSel}/>} />
        <Route path="createprice" element={<CreatePrice/>} />
        <Route path="listfish" element={<ListFish setSideNavSel={setSideNavSel}/>} />
        <Route path="createfish" element={<CreateFish/>} />
        <Route path="/editfishform" element={<EditFishForm editfish={editfish} seteditfish={seteditfish}/>} />
        <Route path="createrequest" element={<CreateRequest/>} />
        <Route path="listfishingrequest" element={<ListFishingRequest setSideNavSel={setSideNavSel}/>} />
        <Route path="/editfishreq" element={<EditFishingRequest />} />
        <Route path="listfishcatch" element={<ListFishCatch setSideNavSel={setSideNavSel}/>} />
        <Route path="/uploadid" element={<Uploadid setSideNavSel={setSideNavSel}/>} />
        <Route path="/listidcard" element={<Listuseridcard setSideNavSel={setSideNavSel}/>} />
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
