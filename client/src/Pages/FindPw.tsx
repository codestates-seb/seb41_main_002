import Modal from "../Components/Commons/Modal";
import React, { useState } from "react";
import { findPw } from "../API/FindIdPw";
import "./Style/memberAccess.css";
import AccessMenu from "../Components/SignUp/AccessMenu";

const FindPw = () => {
  const [modalState, setModalState] = useState(false);
  const [modalText, setModalText] = useState("");
  const [userInfo, setUserInfo] = useState({
    accountId: "",
    email: "",
  });

  const onUserInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const findPwHandler = () => {
    setModalState(true);
    if (userInfo.accountId === "") {
      setModalText("아이디가 비었습니다.");
    } else if (userInfo.email === "") {
      setModalText("이메일이 비었습니다.");
    } else if (userInfo.email.includes("@") === false) {
      setModalText("이메일에 @가 없습니다.");
    } else {
      findPw(userInfo).then((res) => {
        if (res) {
          setModalText("임시 비밀번호를 이메일로 전송했습니다.");
        } else {
          setModalText("아이디 혹은 비밀번호가 틀렸습니다.");
        }
      });
    }
  };

  return (
    <div className="Member_Access_Container">
      {modalState ? (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          element={<div className="Modal_Text">{modalText}</div>}
        />
      ) : null}
      <AccessMenu />
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
