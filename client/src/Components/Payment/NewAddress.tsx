import React, { useState } from "react";
import styled from "styled-components";
import { 주소입력 } from "../../API/Payment";

const AddressInput = styled.ul`
  padding-top: 20px;
  li {
    width: 500px;
    display: flex;
    line-height: 30px;
    font-size: 17px;
    margin-bottom: 10px;
  }

  li:last-child {
    justify-content: end;
  }

  li:last-child button {
    width: 100px;
  }

  li:last-child button:focus {
    background-color: var(--dark);
  }

  li label {
    width: 25%;
    margin-right: 7px;
  }

  li input:focus {
    background-color: var(--dark);
  }
`;

const Input = styled.input<{ width: string }>`
  width: ${(props) => props.width};
`;

const NewAddress = () => {
  const [배송지명, set배송지명] = useState("");
  const [우편번호, set우편번호] = useState("");
  const [상세주소, set상세주소] = useState("");

  const 주소저장 = () => {
    const 주소 = {
      memberId: 1,
      isPrimary: false,
      addressTitle: 배송지명,
      zipcode: 우편번호,
      address: 상세주소,
    };
    주소입력(주소).then((res) => {
      console.log(res);
    });
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    set배송지명(e.target.value);
  };

  const onChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    set우편번호(e.target.value);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    set상세주소(e.target.value);
  };
  return (
    <AddressInput>
      <li>
        <label>배송지명</label>
        <input
          type="text"
          className="textBox"
          value={배송지명}
          onChange={onChangeName}
          placeholder="배송지명을 입력하세요"
        />
      </li>
      <li>
        <label>배송지 주소</label>
        <Input
          type="text"
          className="textBox"
          width={"130px"}
          value={우편번호}
          onChange={onChangeZipCode}
          onClick={() => {
            console.log("주소 입력");
          }}
          placeholder="주소를 입력하세요"
          readOnly
        />
      </li>
      <li>
        <label></label>
        <Input
          type="text"
          className="textBox"
          width={"75%"}
          value={상세주소}
          onChange={onChangeAddress}
          onClick={() => {
            console.log("주소 입력");
          }}
          readOnly
        />
      </li>
      <li>
        <button onClick={주소저장}>저장</button>
      </li>
    </AddressInput>
  );
};

export default NewAddress;
