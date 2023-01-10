import React from "react";
import "./Style/MemberAccess.css";

const Login = () => {
  return (
    <div className="Member_Access_Container">
      <ul className="Member_Access_Menu">
        <li>회원가입</li>
        <li>로그인</li>
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
      </ul>
      <ul className="Member_Access_Contents">
        <li>로그인</li>
        <li>
          <label htmlFor="LogIn_id">ID</label>
          <input id="LogIn_id" type="text" />
        </li>
        <li>
          <label htmlFor="LogIn_pw">PW</label>
          <input id="LogIn_pw" type="password" />
        </li>
        <li>
          <button>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default Login;
