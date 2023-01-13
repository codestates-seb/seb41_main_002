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

const ShippingAddress = ({ address, addressCheck }: any) => {
  return (
    <AddressContainer>
      <input
        id={`${address.zipcode}${address.addressId}`}
        type="radio"
        name="address"
        onChange={() => {
          addressCheck(address);
        }}
      />
      <label htmlFor={`${address.zipcode}${address.addressId}`}>
        {address["addressTitle"]}
      </label>
    </AddressContainer>
  );
};

export default ShippingAddress;
