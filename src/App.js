import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useRef,useEffect } from "react";
import AdminMain from "./components/admin/AdminMain";
import UserMain from "./components/admin/UserComponents/UserMain";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [usrname, setusrname] = useState("");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm setusrname={setusrname}/>} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="admin/*" element={<AdminMain usrname={usrname} setusrname={setusrname}/>} />
        <Route path="user/*" element={<UserMain/>} />
      </Routes>
    </div>
  );
}

export default App;
