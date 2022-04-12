import React, { useEffect, useState,useRef } from "react";
import { Route, Routes } from "react-router-dom";

import AddMembers from "../AddMembers";
import EditUserData from "../EditUserData";
import EditUserForm from "../EditUserForm";
import EditUserStatus from "../EditUserStatus";
import Footer from "../Footer";
import Header from "../Header";
import Logout from "../Logout";
import ResetPassword from "../ResetPassword";
import AdminHome from "./AdminComponents/AdminHome";
import AdminSideNav from "./AdminComponents/AdminSideNav";
import CreateUser from "./AdminComponents/CreateUser";
import ListPrice from "./AdminComponents/ListPrice";
import ListUserData from "./AdminComponents/ListUserData";
import ListUserDataForm from "./AdminComponents/ListUserDataForm";

function AdminMain() {
  const [lim, setlim] = useState(0);
  const [page, setPage] = useState(1);
  const [pricepage, setpricePage] = useState(1);
  const [activetog, setactivetog] = useState(true);
  const [del, setdel] = useState(0);
  const [edit, setedit] = useState(0);
  const isMounted4 = useRef(false);
  const [search, setSearch] = useState(false);
  const [list2, setlist2] = useState("nothing");
  return (
    <div>
      <Header />
      <AdminSideNav setlim={setlim} page={page} activetog={activetog} edit={edit} del={del} isMounted4={isMounted4} />
      <Routes>
        <Route path="home" element={<AdminHome page={page} setlim={setlim} />} />
        <Route path="settings/edituserdata" element={<EditUserData edit={edit} setedit={setedit}/>} />
        <Route path="/edituserform" element={<EditUserForm edit={edit} setedit={setedit} />} />
        <Route path="settings/resetpassword" element={<ResetPassword />}  />
        <Route path="settings/edituserstatus" element={<EditUserStatus />} />
        <Route path="/createuser" element={<CreateUser/>} />
        <Route path="logout" element={<Logout/>} />
        <Route path="settings/addmembers" element={<AddMembers/>} />
        <Route path="listuserdataform" element={<ListUserDataForm />} />
        <Route path="listuserdata" element={<ListUserData lim={lim} page={page} setPage={setPage} activetog={activetog} setactivetog={setactivetog} del={del} setdel={setdel} search={search} setSearch={setSearch} list2={list2} setList2={setlist2}/>} />
        <Route path="listprice" element={<ListPrice pricepage={pricepage} setpricePage={setpricePage}/>} />
        

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
