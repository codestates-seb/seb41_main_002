import styled from "styled-components";

const DetailContainer = styled.ul`
  padding-top: 20px;
  li {
    width: 500px;
    display: flex;
    line-height: 30px;
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

interface DetailType {
  memberName: string;
  phoneNumber: string;
  zipcode: string;
  address: string;
}

const AddressDetail = (props:DetailType) => {
  return (
    <DetailContainer>
      <li>{props.memberName}</li>
      <li>{props.phoneNumber}</li>
      <li>({props.zipcode}){props.address}</li>
    </DetailContainer>
  )
}

export default AddressDetail