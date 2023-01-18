import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getMemberAddressData,
  MemberPageDataType,
} from "../API/MemberPageEditAPI";
import CustomButton from "../Components/Commons/Buttons";
import "./Style/memberPageEdit.css";

const MemberInfoContent = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  background-color: var(--dark3);
  border-bottom: 1px solid white;
`;

const MemberInfoText = styled.span`
  display: flex;
  width: 50%;
`;

const InfoTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
  align-items: center;
  background-color: var(--dark3);
  border-bottom: 1px solid white;
`;

const InfoContent = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  align-items: center;
  background-color: var(--dark3);
  border-bottom: 1px solid white;
`;

const SubscribeBenefit = styled(InfoContent)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddressEditContainer = styled.div`
  position: absolute;
  right: 298px;
  button {
    margin-left: 10px;
  }
`;

// 로그인 연동이 안 되어 있기 때문에 현재 수동으로 입력
// 이후 로그인 연동 이후 해당 데이터 삭제
const session = {
  accountId: "shim5505",
  memberId: 1,
};

export default function MemberPageEdit() {
  const [memberAddressData, setMemberAddressData] = useState<
    MemberPageDataType | undefined
  >();

  useEffect(() => {
    try {
      getMemberAddressData(session.memberId).then((res) => {
        setMemberAddressData(res);
        console.log(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    // 추후 데이터 수정 예정
    <div className="Edit_Page_Container">
      <h1 className="Edit_Page_Title">회원정보 수정</h1>
      <ul className="Member_Infomation_Contents">
        <MemberInfoContent>
          <div className="Info_Wrapper">
            <MemberInfoText>ID</MemberInfoText>
            <MemberInfoText>
              {memberAddressData && memberAddressData.accountId}
            </MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Wrapper">
            <MemberInfoText>PW</MemberInfoText>
            <MemberInfoText>**********</MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Wrapper">
            <MemberInfoText>이름</MemberInfoText>
            <MemberInfoText>
              {memberAddressData && memberAddressData.memberName}
            </MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Wrapper">
            <MemberInfoText>생년월일</MemberInfoText>
            <MemberInfoText>
              {memberAddressData && memberAddressData.birthdate}
            </MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Wrapper">
            <MemberInfoText>이메일</MemberInfoText>
            <MemberInfoText>
              {memberAddressData && memberAddressData.email}
            </MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Wrapper">
            <MemberInfoText>핸드폰 번호</MemberInfoText>
            <MemberInfoText>
              {memberAddressData && memberAddressData.phoneNumber}
            </MemberInfoText>
          </div>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Wrapper">
            <MemberInfoText>내 배송지</MemberInfoText>
            {memberAddressData?.addressList.length === 0 ? (
              <MemberInfoText> 배송지 없음 </MemberInfoText>
            ) : null}

            {memberAddressData &&
              memberAddressData.addressList.map((address) => {
                return (
                  <>
                    <div>
                      {address.isPrimary ? "대표 주소: " : ""}
                      <MemberInfoText>{`${address.addressTitle} ${address.address} (${address.zipcode})`}</MemberInfoText>
                    </div>
                    <AddressEditContainer>
                      <CustomButton
                        bgColor="gray"
                        content="수정"
                        fontColor="white"
                        padding="5px"
                        width="100px"
                      />
                      <CustomButton
                        bgColor="gray"
                        content="삭제"
                        fontColor="white"
                        padding="5px"
                        width="100px"
                      />
                    </AddressEditContainer>
                  </>
                );
              })}
          </div>
        </MemberInfoContent>

        <MemberInfoContent>
          <CustomButton
            bgColor="gray"
            content="배송지 추가"
            fontColor="white"
            padding="10px"
            width="125px"
          />
        </MemberInfoContent>
        <div>
          <div className="Edit_Type_Container">
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <MemberInfoText>
                {memberAddressData && memberAddressData.tagList[0]}
              </MemberInfoText>
              <select />
            </InfoContent>
          </div>
          <div className="Edit_Type_Container">
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <MemberInfoText>
                {memberAddressData && memberAddressData.tagList[1]}
              </MemberInfoText>
              <select />
            </InfoContent>
          </div>
          <div className="Edit_Type_Container">
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <MemberInfoText>
                {memberAddressData && memberAddressData.tagList[2]}
              </MemberInfoText>
              <select />
            </InfoContent>
          </div>
        </div>
      </ul>
      <div className="Edit_Button_Wrap">
        <CustomButton
          bgColor="gray"
          content="수정하기"
          fontColor="white"
          padding="5px"
          width="100px"
        />
      </div>
      <div className="Subscribe_Edit_Container">
        <div className="Subscribe_Start_Date">
          <InfoTitle>
            <MemberInfoText>구독 시작일</MemberInfoText>
          </InfoTitle>
          <InfoContent>
            <MemberInfoText>
              {memberAddressData && memberAddressData.subscribedDate}
            </MemberInfoText>
          </InfoContent>
        </div>
        <div className="Subscribe_Benefits_Container">
          <InfoTitle>
            <MemberInfoText>지금까지 받은 혜택</MemberInfoText>
          </InfoTitle>
          <SubscribeBenefit>
            <MemberInfoText>구독일로부터</MemberInfoText>
            <MemberInfoText>4개의 샘플</MemberInfoText>
            <MemberInfoText>4개의 샘플</MemberInfoText>
            <MemberInfoText>4개의 샘플</MemberInfoText>
          </SubscribeBenefit>
        </div>
      </div>
      {/* 밑 코드는 추후 공용 컴포넌트로 교체 예정 */}
      <div className="Edit_Button_Wrap">
        <CustomButton
          bgColor="gray"
          content="구독 취소"
          fontColor="white"
          padding="5px"
          width="100px"
        />
      </div>
    </div>
  );
}
