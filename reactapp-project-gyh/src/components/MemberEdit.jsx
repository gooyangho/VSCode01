import React, { useState, useEffect } from "react";

export default function MemberEdit() {
  const [form, setForm] = useState({
    userid: "",
    password: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (!userid) { //로그인된아이디가없으면 메시지
      alert("로그인 후 이용해주세요.");
      window.location.href = "/login";
      return;
    }

    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    //불러온회원정보가있고 일치하면 정보를채워넣음
    if (storedUserInfo && storedUserInfo.userid === userid) {
      setForm({
        userid: storedUserInfo.userid,
        password: storedUserInfo.password || "",
        name: storedUserInfo.name || "",
        email: storedUserInfo.email || "",
        phone: storedUserInfo.phone || "",
      });

    } else {
      // 회원 정보가 없을 경우
      setForm({ userid, name: "", email: "", phone: "" });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  //폼제출시실행되는 함수 
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userInfo", JSON.stringify(form)); 
    alert("회원정보가 수정되었습니다.");
  };

  return (
     <div style={{ paddingTop: "100px" }}>
      <form onSubmit={handleSubmit}>
        <h2>회원정보 수정</h2>
        <div className="form-row"> 
          <label>아이디: </label>
          <input value={form.userid} readOnly /> {/*입력칸보여줌 readOnly속성은 수정불가  */}
        </div>
        
        <div className="form-row">
        <label>비밀번호:</label>
        <input
        type="password" //입력값 숨김
        name="password"
        value={form.password}
        onChange={handleChange}
        />
        </div>

        <div className="form-row">
          <label>이름: </label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>이메일: </label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        
        <div className="form-row">
          <label>휴대전화번호: </label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}