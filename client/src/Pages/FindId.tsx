import React, { useEffect, useState } from "react";
import Modal from "../Components/Commons/Modal";
import { Link, useNavigate } from "react-router-dom";
import "./Style/memberAccess.css";

const FindId = () => {
  const [modalState, setModalState] = useState(false);
  const [email, setEmail] = useState("");

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
          <button>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default FindId;
