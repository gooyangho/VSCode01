import React from "react";
import { Link } from "react-router-dom";

export default function TopNavi() {
  const navStyle = {
    position: "fixed",   
    top: 0,             
    left: "50%",        
    transform: "translateX(-50%)",  
    background: "#eee",
    padding: "10px 20px",
    zIndex: 1000,      
    borderBottom: "1px solid #ccc",
    display: "flex",
    gap: "15px",
    borderRadius: "0 0 8px 8px"
  };

  return (
    <nav style={navStyle}>
      <Link to="/">홈</Link>
      <Link to="/signup">회원가입</Link>
      <Link to="/login">로그인</Link>
      <Link to="/memberedit">회원정보 수정</Link>
    </nav>
  );
}
