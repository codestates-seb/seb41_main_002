import { useState } from "react";
import styled from "styled-components";
import CustomButton from "../Components/Commons/Buttons";
import "./Style/resetPw.css";

const InfoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 75px;
  background-color: var(--dark3);
  border-bottom: 1px solid white;

  &:last-child {
    border: none;
  }
`;

export default function ResetPw() {
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [confirmNewPw, setConfirmNewPw] = useState<string>("");

  const handleCurrentPw: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentPw(e.target.value);
  };

  const handleNewPw: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewPw(e.target.value);
  };

  const handleConfirmPw: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmNewPw(e.target.value);
  };

  return (
    <form className="Reset_Pw_Form">
      <h1>비밀번호 재설정</h1>
      <div className="Input_Fields_Wrapper">
        <InfoWrapper>
          <div className="Input_Label">기존 비밀번호</div>
          <input
            className="Input_Content"
            type="text"
            value={currentPw}
            onChange={handleCurrentPw}
          />
        </InfoWrapper>
        <InfoWrapper>
          <div className="Input_Label">새 비밀번호</div>
          <input
            className="Input_Content"
            type="text"
            value={newPw}
            onChange={handleNewPw}
          />
        </InfoWrapper>
        <InfoWrapper>
          <div className="Input_Label">새 비밀번호 확인</div>
          <input
            className="Input_Content"
            type="text"
            value={confirmNewPw}
            onChange={handleConfirmPw}
          />
        </InfoWrapper>
      </div>
      <CustomButton
        bgColor="transparent"
        content="비밀번호 재설정"
        fontColor="gold"
        padding="5px"
        width="200px"
        border="none"
        fontsize="23px"
      />
    </form>
  );
}
