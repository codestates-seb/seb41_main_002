import React from "react";
import styled from "styled-components";

const AddressContainer = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  span{
    margin-left:5px;
  }
`;

interface 주소타입 {
  address: string;
  addressId: number;
  addressTitle: string;
  isPrimary: boolean;
  zipcode: string;
}

const ShippingAddress = ({address}: any) => {
  return (
    <AddressContainer>
      <input id={`${address.zipcode}${address.addressId}`} type="radio" name="address"/>
      <label htmlFor={`${address.zipcode}${address.addressId}`}>{address["addressTitle"]}</label>
      <span>X</span>
    </AddressContainer>
  );
};

export default ShippingAddress;
