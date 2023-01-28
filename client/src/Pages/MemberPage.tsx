import CustomButton from "../Components/Commons/Buttons";
import { SkinTag } from "../Components/Commons/TypeBadge";
import styled from "styled-components";
import {
  OrderHistoryTab,
  MyReviewsTab,
} from "../Components/MyPageComponent/MyPageTabs";
import { Link, useParams } from "react-router-dom";
import "./Style/memberPage.css";
import { useEffect, useState } from "react";
import {
  getProfileData,
  ProfileDataType,
} from "../API/MemberPage/MemberPageAPI";

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

const memberId = Number(sessionStorage.getItem("memberId"));

const MemberPage = () => {
  const { memberPageId } = useParams();
  const [profileData, setProfileData] = useState<ProfileDataType>();

  useEffect(() => {
    try {
      getProfileData(memberId).then((res) => {
        setProfileData(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, [memberPageId]);

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
          <InfoText width="67%">{profileData?.memberName}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">생년월일</InfoText>
          <InfoText width="67%">{profileData?.birthdate}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">이메일</InfoText>
          <InfoText width="67%">{profileData?.email}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="33%">연락처</InfoText>
          <InfoText width="67%">{profileData?.phoneNumber}</InfoText>
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="100%">대표 주소</InfoText>
        </MemberTextBox>
        <MemberTextBox style={{ height: `100px` }}>
          {profileData?.address !== null ? (
            <InfoText width="100%">{profileData?.address}</InfoText>
          ) : (
            <InfoText width="100%"> 대표주소가 없습니다.</InfoText>
          )}
        </MemberTextBox>
        <MemberTextBox>
          <InfoText width="100%">
            {profileData?.isSubscribed ? (
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
      {profileData?.tagList.length !== 0 ? (
        <ul className="Profile_Tags">
          <MemberTextBox>
            <InfoText width="33%">내 피부 타입</InfoText>
            <InfoText width="67%" className="Profile_Type_Badges">
              {SkinTag(profileData?.tagList[0] as string)}
            </InfoText>
          </MemberTextBox>
          <MemberTextBox>
            <InfoText width="33%">여드름성 피부 여부</InfoText>
            <InfoText width="67%" className="Profile_Type_Badges">
              {SkinTag(profileData?.tagList[1] as string)}
            </InfoText>
          </MemberTextBox>
          <MemberTextBox>
            <InfoText width="33%">원하는 기능</InfoText>
            <InfoText width="67%" className="Profile_Type_Badges">
              {profileData?.tagList.slice(2, profileData?.tagList.length)
                .length !== 0 ? (
                profileData?.tagList
                  .slice(2, profileData?.tagList.length)
                  .map((tag, idx) => {
                    return <span key={`tag${idx}`}> {SkinTag(tag)}</span>;
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
        {currentTab === 1 ? (
          <OrderHistoryTab profileData={profileData as ProfileDataType} />
        ) : null}
        {currentTab === 2 ? (
          <MyReviewsTab profileData={profileData as ProfileDataType} />
        ) : null}
      </div>
    </div>
  );
};

export default MemberPage;
