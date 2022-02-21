import React from "react";
import { Route, Routes } from "react-router-dom";
import EditUserData from "../../EditUserData";
import EditUserStatus from "../../EditUserStatus";
import Footer from "../../Footer";
import Header from "../../Header";
import ResetPassword from "../../ResetPassword";
import UserHome from "./UserHome";



import UserSideNav from "./UserSideNav";

function UserMain() {
 
  return (
    <div>
      <Header/>
      <UserSideNav/>
      <Routes>
        <Route path="home" element={<UserHome/>} />
        <Route path="settings/edituserdata" element={<EditUserData/>} />
        <Route path="settings/resetpassword" element={<ResetPassword/>} />
        <Route path="settings/edituserstatus" element={<EditUserStatus/>} />
      </Routes>
      {/*
                
                <Route path="settings/edituserstatus" element={<EditUserStatus/>}/>
                <Route path="settings/changepassword" element={<ResetPassword/>}/>
      */}
    
      <Footer/>
    </div>
  );
}

export default UserMain;