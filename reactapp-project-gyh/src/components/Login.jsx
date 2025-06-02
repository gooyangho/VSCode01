import React, { useState, useEffect } from "react";

export default function Login() {
  const [userid, setUserid] = useState("");        // 아이디 입력값
  const [password, setPassword] = useState("");    // 비밀번호 입력값
  const [loggedInUser, setLoggedInUser] = useState( //로그인된 아이디저장
    localStorage.getItem("userid") || ""
  );

  const handleLogin = (e) => {
    e.preventDefault();

    // 저장된 회원가입 정보 불러오기
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    // 존재하지 않거나 정보가 틀릴 경우
    if (
      !storedUserInfo ||
      storedUserInfo.userid !== userid ||
      storedUserInfo.password !== password
    ) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    // 로그인 성공
    localStorage.setItem("userid", userid);
    setLoggedInUser(userid);
    alert("로그인 성공");
  };

     //로그아웃
  const handleLogout = () => {
    localStorage.removeItem("userid");
    setLoggedInUser("");
  };

  //로그인시 보여지는형태
  if (loggedInUser) {
    return (
      <div>
        <h2>로그인 상태</h2>
        <p>안녕하세요, {loggedInUser}님</p>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    );
  }

  //로그인폼
  return (
      <div style={{ paddingTop: "100px" }}>
      <form onSubmit={handleLogin}>
        <h2>로그인</h2>
        <div className="form-row"> 
          <label>아이디: </label>
          <input
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>비밀번호: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}