import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Commons/Modal";
import SignUpAdmission from "../Components/SignUp/SignUpAdmission";
import {
  onEmailRegex,
  onInputNullCheck,
  onIdDoubleCheck,
  onPasswordConfirm,
} from "../Function/signUp";
import { MemberType, signUp } from "../API/SignUp";
import { useAppSelector } from "../Store/hooks";
import "./Style/memberAccess.css";
import AccessMenu from "../Components/SignUp/AccessMenu";

const SignUp = () => {
  const [Member, setMember] = useState<MemberType>({
    accountId: "",
    password: "",
    memberName: "",
    birthDate: "",
    email: "",
    phoneNumber: "010-",
  });
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [idCheck, setIdCheck] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [signUpModalState, setSignUpModalState] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  
  const onMemberTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "accountId") {
      setIdCheck(false);
    }
    if (name === "phoneNumber") {
      if (value.length < 5) {
        setMember({
          ...Member,
          [name]: "010-",
        });
      } else {
        setMember({
          ...Member,
          [name]: value
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, ""),
        });
      }
    } else if (name === "memberName") {
      setMember({
        ...Member,
        [name]: value
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim, "")
          .replace(/[0-9 ]/gim, ""),
      });
    } else {
      setMember({ ...Member, [name]: value.replace(/(\s*)/g, "") });
    }
  };

  const onPasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value.replace(/(\s*)/g, ""));
  };

  const idDoubleCheck = async () => {
    await onIdDoubleCheck(Member, setMessage, setModalState).then((res) => {
      setIdCheck(res);
    });
  };

  const navigate = useNavigate();
  const userLogin = useAppSelector((state) => {
    return state.user.userLogin;
  });
  useEffect(() => {
    if (userLogin === 1) {
      navigate("/");
      window.location.reload();
    }
  }, [userLogin]);

  const memberSignUpAdmission = () => {
    const nullCheck = onInputNullCheck(Member, setMessage, setModalState);
    const pwCheck = onPasswordConfirm(
      Member.password,
      passwordCheck,
      setMessage,
      setModalState
    );
    const emailCheck = onEmailRegex(Member.email);
    const allCheck = idCheck && emailCheck && nullCheck && pwCheck;
    if (!idCheck) {
      setMessage("????????? ??????????????? ????????????.");
      setModalState(true);
    } else if (Member.email?.includes("@") === false) {
      setMessage("???????????? ?????????(@)??? ???????????? ?????????.");
      setModalState(true);
    } else if (Member.phoneNumber?.length !== 13) {
      setMessage("????????? ????????? 010??? ????????? ??? 11????????? ????????? ?????????.");
      setModalState(true);
    } else if (allCheck) {
      setSignUpModalState(true);
    }
  };

  return (
    <div className="Member_Access_Container">
      {signUpModalState ? (
        <Modal
          modalState={signUpModalState}
          setModalState={setSignUpModalState}
          element={
            <SignUpAdmission
              Member={Member}
              setSignUpModalState={setSignUpModalState}
              setModalState={setModalState}
              setMessage={setMessage}
            />
          }
        />
      ) : null}
      {modalState ? (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          element={<div className="Modal_Text">{message}</div>}
        />
      ) : null}
      <AccessMenu />
      <ul className="Member_Access_Contents">
        <li>????????????</li>
        <li>
          <label htmlFor="SignUp_Id">ID</label>
          <input
            id="SignUp_Id"
            type="text"
            name="accountId"
            value={Member.accountId}
            onChange={onMemberTextHandler}
          />
          <button id="Double_Check_Btn" onClick={idDoubleCheck}>
            ????????????
          </button>
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
          <label htmlFor="SignUp_PwCheck">PW ??????</label>
          <input
            id="SignUp_PwCheck"
            type="password"
            value={passwordCheck}
            onChange={onPasswordCheckHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_Name">??????</label>
          <input
            id="SignUp_Name"
            type="text"
            name="memberName"
            value={Member.memberName}
            onChange={onMemberTextHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_Birthday">????????????</label>
          <input
            id="SignUp_Birthday"
            type="date"
            name="birthDate"
            value={Member.birthDate}
            onChange={onMemberTextHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_Email">?????????</label>
          <input
            id="SignUp_Email"
            type="email"
            name="email"
            value={Member.email}
            onChange={onMemberTextHandler}
          />
        </li>
        <li>
          <label htmlFor="SignUp_PhoneNumber">????????? ??????</label>
          <input
            id="SignUp_PhoneNumber"
            type="tel"
            name="phoneNumber"
            value={Member.phoneNumber}
            onChange={onMemberTextHandler}
            maxLength={13}
          />
        </li>
        <li>
          <button onClick={memberSignUpAdmission}>??????</button>
        </li>
      </ul>
    </div>
  );
};

export default SignUp;
