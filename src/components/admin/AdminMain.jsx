import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import EditUserData from "../EditUserData";
import EditUserStatus from "../EditUserStatus";
import Footer from "../Footer";
import Header from "../Header";
import ResetPassword from "../ResetPassword";
import AdminHome from "./AdminComponents/AdminHome";
import AdminSideNav from "./AdminComponents/AdminSideNav";
import ListUserData from "./AdminComponents/ListUserData";
import ListUserDataForm from "./AdminComponents/ListUserDataForm";

function AdminMain() {
  const [lim, setlim] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <div>
      <Header />
      <AdminSideNav setlim={setlim} page={page} />
      <Routes>
        <Route path="home" element={<AdminHome />} />
        <Route path="settings/edituserdata" element={<EditUserData />} />
        <Route path="settings/resetpassword" element={<ResetPassword />} />
        <Route path="settings/edituserstatus" element={<EditUserStatus />} />
        <Route path="listuserdataform" element={<ListUserDataForm />} />
        <Route path="listuserdata" element={<ListUserData lim={lim} page={page} setPage={setPage}/>} />
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
