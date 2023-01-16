import React from "react";
import { Link } from "react-router-dom";
import "./Style/memberAccess.css";

const Login = () => {
  return (
    <div className="Member_Access_Container">
      <ul className="Member_Access_Menu">
        <li><Link to={"/signUp"}>회원가입</Link></li>
        <li><Link to={"/login"}>로그인</Link></li>
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
      </ul>
      <ul className="Member_Access_Contents">
        <li>로그인</li>
        <li>
          <label htmlFor="LogIn_Id">ID</label>
          <input id="LogIn_Id" type="text" />
        </li>
        <li>
          <label htmlFor="LogIn_Pw">PW</label>
          <input id="LogIn_Pw" type="password" />
        </li>
        <li>
          <button>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default Login;
