import Modal from "../Components/Commons/Modal";
import { onLogin } from "../API/LoginAPI";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style/memberAccess.css";

const Login = () => {
  const [MemberInput, setMemberInput] = useState({
    accountId: "",
    password: "",
  });
  const [modalState, setModalState] = useState(false);

  const navigate = useNavigate();

  const onMemberInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setMemberInput({ ...MemberInput, [name]: value });
  };

  const memberLogin = () => {
    onLogin(MemberInput).then((res) => {
      if (res) {
        navigate("/");
        window.location.reload();
      } else {
        setModalState(true);
      }
    });
  };

  return (
    <div className="Member_Access_Container">
      {modalState ? (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          element={
            <div className="Modal_Text">아이디와 비밀번호가 틀렸습니다.</div>
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
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
      </ul>
      <ul className="Member_Access_Contents">
        <li>로그인</li>
        <li>
          <label htmlFor="LogIn_Id">ID</label>
          <input
            id="LogIn_Id"
            type="text"
            name="accountId"
            value={MemberInput.accountId}
            onChange={onMemberInputHandler}
          />
        </li>
        <li>
          <label htmlFor="LogIn_Pw">PW</label>
          <input
            id="LogIn_Pw"
            type="password"
            name="password"
            value={MemberInput.password}
            onChange={onMemberInputHandler}
          />
        </li>
        <li>
          <button onClick={memberLogin}>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default Login;
