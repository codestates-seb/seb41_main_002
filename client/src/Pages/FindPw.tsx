import React, { useEffect, useState } from "react";
import Modal from "../Components/Commons/Modal";
import { Link, useNavigate } from "react-router-dom";
import "./Style/memberAccess.css";
import { findPw } from "../API/FindIdPw";

const FindPw = () => {
  const [modalState, setModalState] = useState(false);
  const [userInfo, setUserInfo] = useState({
    accountId: "",
    email: "",
  });

  const onUserInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const findPwHandler = () => {
    findPw(userInfo).then(() => {
      setModalState(true);
    });
  };

  return (
    <div className="Member_Access_Container">
      {modalState ? (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          element={
            <div className="Modal_Text">
              임시 비밀번호를 이메일로 전송했습니다.
            </div>
          }
        />
      ) : null}
      <ul className="Member_Access_Menu">
        <li>
          <Link to={"/signUp"}>회원가입</Link>
        </li>
        <li>
          <Link to={"/login"}>로그인</Link>
        </li>
        <li>
          <Link to={"/findId"}>아이디 찾기</Link>
        </li>
        <li>
          <Link to={"/findPw"}>비밀번호 찾기</Link>
        </li>
      </ul>
      <ul className="Member_Access_Contents">
        <li>비밀번호 찾기</li>
        <li>
          <label htmlFor="FindPW_Id">ID</label>
          <input
            id="FindPW_Id"
            type="text"
            name="accountId"
            value={userInfo.accountId}
            onChange={onUserInfoHandler}
          />
        </li>
        <li>
          <label htmlFor="FindPW_Email">Email</label>
          <input
            id="FindPW_Email"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={onUserInfoHandler}
          />
        </li>
        <li>
          <button onClick={findPwHandler}>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default FindPw;
