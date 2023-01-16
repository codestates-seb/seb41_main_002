import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createInputFiles } from "typescript";
import "./Style/memberAccess.css";

const SignUp = () => {
  interface MemberType {
    accountID: string;
    password: string;
    memberName: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
  }

  const [Member, setMember] = useState<MemberType>({
    accountID: "",
    password: "",
    memberName: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
  });
  const [passwordCheck, setPasswordCheck] = useState<string>();

  const onMemberTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setMember({ ...Member, [name]: value });

    if (name === "birthDate") {
      let dateChange = value.replace(/\-/gi, "/");
    }
  };

  const onPasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  return (
    <div className="Member_Access_Container">
      <ul className="Member_Access_Menu">
        <li>
          <Link to={"/signUp"}>회원가입</Link>
        </li>
        <li>
          <Link to={"/login"}>로그인</Link>
        </li>
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
      </ul>
      <ul className="Member_Access_Contents">
        <li>회원가입</li>
        <li>
          <label htmlFor="SignUp_Id">ID</label>
          <input
            id="SignUp_Id"
            type="text"
            name="accountID"
            value={Member.accountID}
            onChange={onMemberTextHandler}
          />
          <button id="Double_Check_Btn">중복확인</button>
        </li>
        <li>
          <label htmlFor="SignUp_Pw">PW</label>
          <input
            id="SignUp_Pw"
            type="password"
            name="password"
            value={Member.password}
            onChange={onMemberTextHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_PwCheck">PW 확인</label>
          <input
            id="SignUp_PwCheck"
            type="password"
            value={passwordCheck}
            onChange={onPasswordCheckHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_Name">이름</label>
          <input
            id="SignUp_Name"
            type="text"
            name="memberName"
            value={Member.memberName}
            onChange={onMemberTextHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_Birthday">생년월일</label>
          <input
            id="SignUp_Birthday"
            type="date"
            name="birthDate"
            value={Member.birthDate}
            onChange={onMemberTextHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_Email">이메일</label>
          <input
            id="SignUp_Email"
            type="email"
            name="email"
            value={Member.email}
            onChange={onMemberTextHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_PhoneNumber">핸드폰 번호</label>
          <input
            id="SignUp_PhoneNumber"
            type="tel"
            name="phoneNumber"
            value={Member.phoneNumber}
            onChange={onMemberTextHandler}
          />
        </li>
        <li>
          <button>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default SignUp;