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

const AddressDetail = () => {
  return (
    <DetailContainer>
      <li>이름</li>
      <li>전화번호</li>
      <li>(우편번호)주소</li>
    </DetailContainer>
  )
}

export default AddressDetail