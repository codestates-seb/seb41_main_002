import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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

interface Props {
  callAddressModal:boolean
  setCallAddressModal: Dispatch<SetStateAction<boolean>>;
  address: string;
  zipcode: string;
}

const NewAddress = ({ callAddressModal, setCallAddressModal, address, zipcode }: Props) => {
  const [addressInfo, setAddressInfo] = useState({
    shippingAddress: "",
    zipcode: "",
    address: "",
  });

  useEffect(() => {
    setAddressInfo({ ...addressInfo, zipcode: zipcode, address: address });
  }, [callAddressModal]);

  const callAddress = () => {
    setCallAddressModal(true);
  };

  const saveAddress = () => {
    const memberId = sessionStorage.getItem("memberId");
    const addressSheet = {
      memberId: Number(memberId),
      isPrimary: false,
      addressTitle: addressInfo.shippingAddress,
      zipcode: addressInfo.zipcode,
      address: addressInfo.address,
    };
    addAddress(addressSheet).then((res) => {
      window.location.reload();
      console.log(res);
    });
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAddressInfo({ ...addressInfo, [name]: value });
  };

  return (
    <AddressInput>
      <li>
        <label>배송지명</label>
        <input
          type="text"
          className="textBox"
          name="shippingAddress"
          value={addressInfo.shippingAddress}
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
          value={addressInfo.zipcode}
          onChange={onChangeAddress}
          onClick={callAddress}
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
          value={addressInfo.address}
          onChange={onChangeAddress}
          onClick={callAddress}
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
