import Modal from "../Components/Commons/Modal";
import AccessMenu from "../Components/SignUp/AccessMenu";
import React, { useState } from "react";
import { findId } from "../API/FindIdPw";
import "./Style/memberAccess.css";

const FindId = () => {
  const [modalState, setModalState] = useState(false);
  const [modalText, setModalText] = useState("이메일 전송중입니다.");
  const [email, setEmail] = useState("");

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const findIdHandler = () => {
    setModalState(true);
    if (email === "") {
      setModalText("이메일이 비었습니다.");
    } else if (email.includes("@") === false) {
      setModalText("이메일에 @가 없습니다.");
    } else {
      findId(email).then((res) => {
        if (res) {
          setModalText("아이디를 이메일로 전송했습니다.");
        } else {
          setModalText("이메일이 틀렸습니다.");
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
        <li>아이디 찾기</li>
        <li>
          <label htmlFor="Find_Email">Email</label>
          <input
            id="Find_Email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => onEmailHandler(e)}
          />
        </li>
        <li>
          <button onClick={findIdHandler}>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default FindId;
