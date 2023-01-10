import React from "react";
import "./Style/MemberAccess.css";

const SignUp = () => {
  return (
    <div className="Member_Access_Container">
      <ul className="Member_Access_Menu">
        <li>회원가입</li>
        <li>로그인</li>
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
      </ul>
      <ul className="Member_Access_Contents">
        <li>회원가입</li>
        <li>
          <label htmlFor="SignUp_Id">ID</label>
          <input id="SignUp_Id" type="text" />
          <button>중복확인</button>
        </li>
        <li>
          <label htmlFor="SignUp_Pw">PW</label>
          <input id="SignUp_Pw" type="password" />
        </li>
        <li>
          <label htmlFor="SignUp_PwCheck">PW 확인</label>
          <input id="SignUp_PwCheck" type="password" />
        </li>
        <li>
          <label htmlFor="SignUp_Name">이름</label>
          <input id="SignUp_Name" type="text" />
        </li>
        <li>
          <label htmlFor="SignUp_Birthday">생년월일</label>
          <input id="SignUp_Birthday" type="date" />
        </li>
        <li>
          <label htmlFor="SignUp_Email">이메일</label>
          <input id="SignUp_Email" type="email" />
        </li>
        <li>
          <label htmlFor="SignUp_PhoneNumber">핸드폰 번호</label>
          <input id="SignUp_PhoneNumber" type="tel" />
        </li>
        <li>
          <button>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default SignUp;
