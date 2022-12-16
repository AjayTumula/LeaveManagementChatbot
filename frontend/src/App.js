import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserHome from "./pages/User/UserHome";
import UserLog from "./components/UserLog";
import UserReg from "./pages/User/UserReg";
import ManagerHome from "./components/ManagerHome";
import BalancedLeaves from "./components/BalancedLeaves";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/login" element={<UserLog />} />
        <Route path="/register" element={<UserReg />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/managerHome" element={<ManagerHome />} />
        <Route path="/leaves" element={<BalancedLeaves/>} />
      </Routes>
    </Router>
  );
}

export default App;
