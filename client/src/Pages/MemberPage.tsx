import dummyData from "./../data/MemberPageData.json";
import CustomButton from "../Components/Commons/Buttons";
import { SkinTag } from "../Components/Commons/TypeBadge";
import styled from "styled-components";
import {
  OrderHistoryTab,
  MyReviewsTab,
} from "../Components/MyPageComponent/MyPageTabs";
import { Link } from "react-router-dom";
import "./Style/memberPage.css";
import { useState } from "react";

const MemberTextBox = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: var(--dark3);
  border: 1px solid var(--lightgray);
`;

const InfoText = styled.div<{ width: string }>`
  width: ${(props) => props.width};
`;

const MemberPage = () => {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <div className="Profile_Container">
      <h1>내 정보</h1>
      <Link to="/member/edit" className="Profile_Edit_Link">
        <CustomButton
          bgColor="white"
          content="수정하기"
          fontColor="black"
          padding="10px"
          width="100px"
        />
      </Link>
      <ul>
        <MemberTextBox>
          <InfoText width="33%">이름</InfoText>
          <InfoText width="67%">{dummyData.memberName}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">생년월일</InfoText>
          <InfoText width="67%">{dummyData.birthdate}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">이메일</InfoText>
          <InfoText width="67%">{dummyData.email}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">연락처</InfoText>
          <InfoText width="67%">{dummyData.phoneNumber}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="100%">대표 주소</InfoText>
        </MemberTextBox>
        <MemberTextBox style={{ height: `100px` }}>
          <InfoText width="100%">{dummyData.address}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="100%">
            {dummyData.isSubscribed ? (
              <span className="Member_Subscribed"> 현재 구독 중 </span>
            ) : (
              <div className="Member_Not_Subscribed">
                <span>구독하고 있지 않습니다.</span>
                <Link to={`/members/:memberId/subscribe`}>
                  <CustomButton
                    bgColor="white"
                    content="구독하러 가기"
                    fontColor="black"
                    padding="10px"
                    width="125px"
                  />
                </Link>
              </div>
            )}
          </InfoText>
        </MemberTextBox>
      </ul>
      <h2>내 태그 정보</h2>
      {dummyData.tagList.length !== 0 ? (
        <ul className="Profile_Tags">
          <MemberTextBox>
            <InfoText width="33%">내 피부 타입</InfoText>
            <InfoText width="67%" className="Profile_Type_Badges">
              {SkinTag(dummyData.tagList[0])}
            </InfoText>
          </MemberTextBox>
          <MemberTextBox>
            <InfoText width="33%">여드름성 피부 여부</InfoText>
            <InfoText width="67%" className="Profile_Type_Badges">
              {SkinTag(dummyData.tagList[1])}
            </InfoText>
          </MemberTextBox>
          <MemberTextBox>
            <InfoText width="33%">원하는 기능</InfoText>
            <InfoText width="67%" className="Profile_Type_Badges">
              {dummyData.tagList.slice(2, dummyData.tagList.length).length !==
              0 ? (
                dummyData.tagList
                  .slice(2, dummyData.tagList.length)
                  .map((tag, idx) => {
                    return <> {SkinTag(tag)}</>;
                  })
              ) : (
                <span className="No_Tags">추가 태그 없음</span>
              )}
            </InfoText>
          </MemberTextBox>
        </ul>
      ) : (
        <div className="Member_Not_Subscribed">
          <span>피부 타입 검사를 하지 않았습니다.</span>
          <Link to={`/members/:memberId/subscribe`}>
            <CustomButton
              bgColor="white"
              content="검사 받으러 가기"
              fontColor="black"
              padding="10px"
              width="150px"
            />
          </Link>
        </div>
      )}
      <div className="Profile_Reviews">
        <ul>
          <li className="Profile_Tabs" onClick={() => setCurrentTab(1)}>
            주문 내역
          </li>
          <li className="Profile_Tabs" onClick={() => setCurrentTab(2)}>
            내 리뷰
          </li>
        </ul>
        {currentTab === 1 ? <OrderHistoryTab /> : null}
        {currentTab === 2 ? <MyReviewsTab /> : null}
      </div>
    </div>
  );
};

export default MemberPage;