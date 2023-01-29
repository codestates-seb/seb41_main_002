import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { resetMemberPw, ResetPwType } from "../API/ResetPw/ResetPwAPI";
import CustomButton from "../Components/Commons/Buttons";
import "./Style/resetPw.css";

const InfoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 75px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
`;
const memberId = Number(sessionStorage.getItem("memberId"));

export default function ResetPw() {
  const navigate = useNavigate();

  const [resetPwData, setResetPwData] = useState<ResetPwType>({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmNewPw, setConfirmNewPw] = useState<string>("");

  const handleResetPwData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    setResetPwData({ ...resetPwData, [name]: value });
  };

  const handleConfirmPw: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmNewPw(e.target.value);
  };

  const memberResetPw: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (confirmNewPw !== resetPwData.newPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
    } else {
      if (window.confirm("새 비밀번호로 변경합니다.")) {
        resetMemberPw(memberId, resetPwData);
      }
      navigate("/");
    }
  };

  return (
    <div className="Reset_Pw_Wrapper">
      <p className="Reset_Pw_Intro">비밀번호를 재설정 합니다.</p>
      <form className="Reset_Pw_Form" onSubmit={memberResetPw}>
        <div className="Input_Fields_Wrapper">
          <InfoWrapper>
            <div className="Input_Label">기존 비밀번호</div>
            <input
              className="Input_Content"
              type="password"
              name="oldPassword"
              value={resetPwData.oldPassword}
              onChange={handleResetPwData}
            />
          </InfoWrapper>
          <InfoWrapper>
            <div className="Input_Label">새 비밀번호</div>
            <input
              className="Input_Content"
              type="password"
              name="newPassword"
              value={resetPwData.newPassword}
              onChange={handleResetPwData}
            />
          </InfoWrapper>
          <InfoWrapper>
            <div className="Input_Label">새 비밀번호 확인</div>
            <input
              className="Input_Content"
              type="password"
              value={confirmNewPw}
              onChange={handleConfirmPw}
            />
          </InfoWrapper>
        </div>
        <div className="Confirm_Button_Wrapper">
          <CustomButton
            height="50px"
            bgColor="transparent"
            content="비밀번호 재설정"
            fontColor="gold"
            padding="5px"
            width="200px"
            border="none"
            fontsize="23px"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
