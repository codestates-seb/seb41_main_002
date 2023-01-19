import React, { useState } from "react";
import styled from "styled-components";
import { addAddress } from "../../API/Payment";

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
  const [shippingAddress, setShippingAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  const saveAddress = () => {
    const addressSheet = {
      memberId: 1,
      isPrimary: false,
      addressTitle: shippingAddress,
      zipcode: zipcode,
      address: address,
    };
    addAddress(addressSheet).then((res) => {
      console.log(res);
    });
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(e.target.value);
  };

  const onChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  return (
    <AddressInput>
      <li>
        <label>배송지명</label>
        <input
          type="text"
          className="textBox"
          value={shippingAddress}
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
          value={zipcode}
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
          width={"375px"}
          value={address}
          onChange={onChangeAddress}
          onClick={() => {
            console.log("주소 입력");
          }}
          readOnly
        />
      </li>
      <li>
        <button onClick={saveAddress}>저장</button>
      </li>
    </AddressInput>
  );
};

export default NewAddress;
