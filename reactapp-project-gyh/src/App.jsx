import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TopNavi from "./components/TopNavi";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MemberEdit from "./components/MemberEdit";

function Home() {
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <TopNavi />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/memberedit" element={<MemberEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
