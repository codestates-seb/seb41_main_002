import React from "react";
import "./Style/MemberAcces.css";

const SignUp = () => {
  return (
    <div className="MemberAcces_Container">
      <ul className="MemberAcces_Menu">
        <li>회원가입</li>
        <li>로그인</li>
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
      </ul>
      <ul className="MemberAcces_Contents">
        <li>회원가입</li>
        <li>
          <label htmlFor="SignUp_id">ID</label>
          <input id="SignUp_id" type="text" />
          <button>중복확인</button>
        </li>
        <li>
          <label htmlFor="SignUp_pw">PW</label>
          <input id="SignUp_pw" type="password" />
        </li>
        <li>
          <label htmlFor="SignUp_pwCheck">PW 확인</label>
          <input id="SignUp_pwCheck" type="password" />
        </li>
        <li>
          <label htmlFor="SignUp_name">이름</label>
          <input id="SignUp_name" type="text" />
        </li>
        <li>
          <label htmlFor="SignUp_birthday">생년월일</label>
          <input id="SignUp_birthday" type="date" />
        </li>
        <li>
          <label htmlFor="SignUp_email">이메일</label>
          <input id="SignUp_email" type="email" />
        </li>
        <li>
          <label htmlFor="SignUp_phoneNumber">핸드폰 번호</label>
          <input id="SignUp_phoneNumber" type="tel" />
        </li>
        <li>
          <button>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default SignUp;
