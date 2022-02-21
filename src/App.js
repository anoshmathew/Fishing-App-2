import { Routes, Route, Link } from "react-router-dom";
import AdminMain from "./components/admin/AdminMain";
import UserMain from "./components/admin/UserComponents/UserMain";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="admin/*" element={<AdminMain />} />
        <Route path="user/*" element={<UserMain/>} />
      </Routes>
    </div>
  );
}

export default App;
