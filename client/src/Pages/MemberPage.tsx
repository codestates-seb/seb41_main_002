import React from "react";
import "./Style/memberPage.css";
import styled from "styled-components";

const MemberTextBox = styled.li`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: var(--dark3);
  border: 1px solid var(--lightgray);
`;

const InfoText = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  text-align: center;
  line-height: 40px;
`;

const MemberPage = () => {
  return (
    <div className="MemberPage_Container">
      <ul>
        <MemberTextBox>
          <InfoText width="33%">이름</InfoText>
          <InfoText width="67%">홍길동</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">생년월일</InfoText>
          <InfoText width="67%">2000.08.15</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">이메일</InfoText>
          <InfoText width="67%">samplemail@gmail.com</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">연락처</InfoText>
          <InfoText width="67%">010-1234-5678</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="100%">대표 주소</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="100%">서울특별시 서초구 서초대로 396 20층, 06619 (집)</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="100%">구독 중</InfoText>
        </MemberTextBox>
      </ul>
      <div className="MemberPage_Tags">
        {/* 나의 태그 */}
      </div>
      <div className="MemberPage_Reviews">
        <ul>
          <li>주문 내역</li>
          <li>내 리뷰</li>
        </ul>
        <div className="Reviews_Contents">
          {/* 컴포넌트 사용 */}
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
