import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useRef,useEffect } from "react";
import AdminMain from "./components/admin/AdminMain";
import UserMain from "./components/admin/UserComponents/UserMain";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [details, setdetails] = useState({name:"",photo:""});
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm setdetails={setdetails}/>} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="admin/*" element={<AdminMain details={details} setdetails={setdetails}/>} />
        <Route path="user/*" element={<UserMain/>} />
      </Routes>
    </div>
  );
}

export default App;
