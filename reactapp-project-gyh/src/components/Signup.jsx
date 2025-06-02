import React, { useState, useRef } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    userid: "",
    password: "",
    passwordConfirm: "",
    name: "",
    emailId: "",
    emailDomain: "",
    phone1: "",
    phone2: "",
    phone3: "",
    zipcode: "",
    address1: "",
    address2: "",
  });

  const [idChecked, setIdChecked] = useState(false);
  const [isCustomDomain, setIsCustomDomain] = useState(false);

  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);

  const checkIdDuplicate = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (form.userid.trim() === "") {
      alert("아이디를 입력하세요");
      return;
    }

    if (storedUserInfo && storedUserInfo.userid === form.userid) {
      alert("이미 가입한 아이디입니다.");
      setIdChecked(false);
    } else {
      alert("사용 가능한 아이디입니다.");
      setIdChecked(true);
    }
  };

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    if (domain === "custom") {
      setForm({ ...form, emailDomain: "" });
      setIsCustomDomain(true);
    } else {
      setForm({ ...form, emailDomain: domain });
      setIsCustomDomain(false);
    }
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const onlyNum = value.replace(/[^0-9]/g, "");
    setForm({ ...form, [name]: onlyNum });

    if (name === "phone1" && onlyNum.length === 3) {
      phone2Ref.current.focus();
    } else if (name === "phone2" && onlyNum.length === 4) {
      phone3Ref.current.focus();
    }
  };

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setForm((prev) => ({
          ...prev,
          zipcode: data.zonecode,
          address1: data.address,
        }));
      },
    }).open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (key !== "address2" && !form[key].trim()) {
        alert("모든 항목을 입력해주세요");
        return;
      }
    }
    if (!idChecked) {
      alert("아이디 중복확인을 해주세요");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const userInfo = {
      userid: form.userid,
      password: form.password,
      name: form.name,
      //백틱`감싼문자열안에 $(변수명)을쓰면 문자열안에그대로넣어주는기능
      email: `${form.emailId}@${form.emailDomain}`, // 이메일 @ 조합
      phone: `${form.phone1}-${form.phone2}-${form.phone3}`, // 전화번호 - 조합     
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    alert("회원가입이 완료되었습니다.");
  };

  const labelStyle = {
    display: "inline-block",
    width: 80,
    color: "black",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 550, margin: "0 auto" }}>
      <h2>회원가입</h2>

      <div className="form-row" style={{ marginBottom: 10 }}>
        <label style={labelStyle}>아이디: </label>
        <input
          type="text"
          value={form.userid}
          onChange={(e) => {
            setForm({ ...form, userid: e.target.value });
            setIdChecked(false);
          }}
          style={{ width: "150px" }}
        />
        <button type="button" onClick={checkIdDuplicate} style={{ marginLeft: 10 }}>
          중복확인
        </button>
      </div>

      <div className="form-row" style={{ marginBottom: 10 }}>
        <label style={labelStyle}>비밀번호: </label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width: "150px" }}
        />
      </div>

      <div className="form-row" style={{ marginBottom: 10 }}>
        <label style={labelStyle}>비밀번호 확인: </label>
        <input
          type="password"
          value={form.passwordConfirm}
          onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
          style={{ width: "150px" }}
        />
      </div>

      <div className="form-row" style={{ marginBottom: 10 }}>
        <label style={labelStyle}>이름: </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: "150px" }}
        />
      </div>

      <div className="form-row" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
        <label style={labelStyle}>이메일: </label>
        <input
          type="text"
          value={form.emailId}
          onChange={(e) => setForm({ ...form, emailId: e.target.value })}
          style={{ width: 100 }}
        />
        <span>@</span>
        <input
          type="text"
          value={form.emailDomain}
          readOnly={!isCustomDomain}
          onChange={(e) => setForm({ ...form, emailDomain: e.target.value })}
          style={{ width: 120 }}
        />
        <select onChange={handleDomainChange} defaultValue="" style={{ marginLeft: 5 }}>
          <option value="">선택</option>
          <option value="naver.com">naver.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="daum.net">daum.net</option>
          <option value="custom">직접입력</option>
        </select>
      </div>

      <div className="form-row" style={{ marginBottom: 10 }}>
        <label style={labelStyle}>휴대전화번호: </label>
        <input
          type="text"
          maxLength={3}
          name="phone1"
          value={form.phone1}
          onChange={handlePhoneChange}
          style={{ width: 40 }}
        />
        -
        <input
          type="text"
          maxLength={4}
          name="phone2"
          value={form.phone2}
          onChange={handlePhoneChange}
          ref={phone2Ref}
          style={{ width: 50, marginLeft: 5 }}
        />
        -
        <input
          type="text"
          maxLength={4}
          name="phone3"
          value={form.phone3}
          onChange={handlePhoneChange}
          ref={phone3Ref}
          style={{ width: 50, marginLeft: 5 }}
        />
      </div>

      <div className="form-row" style={{ marginBottom: 10 }}>
        <label style={labelStyle}>우편번호: </label>
        <input type="text" value={form.zipcode} readOnly style={{ width: 100 }} />
        <button type="button" onClick={openPostcode} style={{ marginLeft: 10 }}>
          우편번호 검색
        </button>
      </div>

      <div className="form-row" style={{ marginBottom: 10 }}>
        <label style={labelStyle}>기본주소: </label>
        <input type="text" value={form.address1} readOnly style={{ width: 300 }} />
      </div>

      <div className="form-row" style={{ marginBottom: 10 }}>
        <label style={labelStyle}>상세주소: </label>
        <input
          type="text"
          value={form.address2}
          onChange={(e) => setForm({ ...form, address2: e.target.value })}
          style={{ width: 300 }}
        />
      </div>

      <button type="submit" style={{ display: "block", margin: "20px auto" }}>
        회원가입
      </button>
    </form>
  );
}
