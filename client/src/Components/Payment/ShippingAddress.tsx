import { FunctionComponent } from "react";
import styled from "styled-components";

const AddressContainer = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

interface AddressType {
  address: string;
  addressId: number;
  addressTitle: string;
  isPrimary: boolean;
  zipcode: string;
}
interface ShippingPropsType {
  address : AddressType;
  addressCheck(address:AddressType): void;
}
const ShippingAddress: FunctionComponent<ShippingPropsType> = (pros) => {
  return (
    <AddressContainer>
      <input
        id={`${pros.address.zipcode}${pros.address.addressId}`}
        type="radio"
        name="address"
        onChange={() => {
          pros.addressCheck(pros.address);
        }}
      />
      <label htmlFor={`${pros.address.zipcode}${pros.address.addressId}`}>
        {pros.address["addressTitle"]}
      </label>
    </AddressContainer>
  );
};

export default ShippingAddress;
