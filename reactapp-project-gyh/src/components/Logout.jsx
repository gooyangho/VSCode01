import React from "react";

export default function Logout() {
  const handleLogout = () => { //로그아웃실행시 동작
    localStorage.removeItem("userid"); //키삭제
    alert("로그아웃 되었습니다.");
    window.location.href = "/login"; // 로그인 페이지로 이동
  };

  return (
    <div>
      <h2>로그아웃</h2>
      <button onClick={handleLogout}>로그아웃 하기</button>
    </div>
  );
}
