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
  const [addressAll, setAddressAll] = useState({
    shippingAddress: "",
    zipcode: "",
    address: ""
  })

  const saveAddress = () => {
    const addressSheet = {
      memberId: 1,
      isPrimary: false,
      addressTitle: addressAll.shippingAddress,
      zipcode: addressAll.zipcode,
      address: addressAll.address,
    };
    addAddress(addressSheet).then((res) => {
      console.log(res);
    });
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAddressAll({ ...addressAll, [name]: value });
  };

  return (
    <AddressInput>
      <li>
        <label>배송지명</label>
        <input
          type="text"
          className="textBox"
          name="shippingAddress"
          value={addressAll.shippingAddress}
          onChange={onChangeAddress}
          placeholder="배송지명을 입력하세요"
        />
      </li>
      <li>
        <label>배송지 주소</label>
        <Input
          type="text"
          className="textBox"
          width={"130px"}
          name="zipcode"
          value={addressAll.zipcode}
          onChange={onChangeAddress}
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
          name="address"
          value={addressAll.address}
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
