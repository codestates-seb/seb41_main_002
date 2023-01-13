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

interface 디테일타입 {
  이름: string;
  전화번호: string;
  우편번호: string;
  주소: string;
}

const AddressDetail = (props:디테일타입) => {
  return (
    <DetailContainer>
      <li>{props.이름}</li>
      <li>{props.전화번호}</li>
      <li>({props.우편번호}){props.주소}</li>
    </DetailContainer>
  )
}

export default AddressDetail