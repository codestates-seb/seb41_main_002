import Modal from "../Components/Commons/Modal";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { findId } from "../API/FindIdPw";
import "./Style/memberAccess.css";
import AccessMenu from "../Components/SignUp/AccessMenu";

const FindId = () => {
  const [modalState, setModalState] = useState(false);
  const [email, setEmail] = useState("");

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const findIdHandler = () => {
    findId(email).then(() => {
      setModalState(true);
    });
  }

  return (
    <div className="Member_Access_Container">
      {modalState ? (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          element={
            <div className="Modal_Text">아이디가 이메일로 전송되었습니다.</div>
          }
        />
      ) : null}
      <AccessMenu/>
      <ul className="Member_Access_Contents">
        <li>아이디 찾기</li>
        <li>
          <label htmlFor="Find_Email">Email</label>
          <input
            id="Find_Email"
            type="text"
            name="email"
            value={email}
            onChange={(e)=>onEmailHandler(e)}
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
