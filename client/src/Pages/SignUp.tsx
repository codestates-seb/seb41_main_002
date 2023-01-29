import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Components/Commons/Modal";
import SignUpAdmission from "../Components/SignUp/SignUpAdmission";
import {
  onEmailRegex,
  onInputNullCheck,
  onIdDoubleCheck,
  onPasswordConfirm,
} from "../Function/signUp";
import { MemberType } from "../API/SignUp";
import { useAppSelector } from "../Store/hooks";
import "./Style/memberAccess.css";
import AccessMenu from "../Components/SignUp/AccessMenu";

const SignUp = () => {
  //회원가입 정보
  const [Member, setMember] = useState<MemberType>({
    accountId: "",
    password: "",
    memberName: "",
    birthDate: "",
    email: "",
    phoneNumber: "010-",
  });
  //비밀번호 체크 input 내용
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  //회원가입 승락
  const [idCheck, setIdCheck] = useState<boolean>(false);
  //일반 모달창
  const [modalState, setModalState] = useState<boolean>(false);
  //회원가입 확인 모달창
  const [signUpModalState, setSignUpModalState] = useState<boolean>(false);
  //일반 모달 내용
  const [message, setMessage] = useState<string>("");
  //input 입력 핸들러
  const onMemberTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "accountId") {
      setIdCheck(false);
    }
    if (name === "phoneNumber") {
      //전화번호 - 추가
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
      //특수문자, 숫자 제거
      setMember({
        ...Member,
        [name]: value
          .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim, "")
          .replace(/[0-9 ]/gim, ""),
      });
    } else {
      setMember({ ...Member, [name]: value });
    }
  };
  //pw확인 input 입력 핸들러
  const onPasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  //중복 체크 확인
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
    //회원가입
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
      setMessage("아이디 중복확인을 해주세요.");
      setModalState(true);
    } else if (Member.email?.includes("@") === false) {
      setMessage("이메일은 도메인(@)을 포함해야 합니다.");
      setModalState(true);
    } else if (Member.phoneNumber?.length !== 13) {
      setMessage("핸드폰 번호는 010을 포함한 총 11자리가 되어야 합니다.");
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
        <li>회원가입</li>
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
            중복확인
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
            maxLength={13}
          />
        </li>
        <li>
          <button onClick={memberSignUpAdmission}>확인</button>
        </li>
      </ul>
    </div>
  );
};

export default SignUp;
