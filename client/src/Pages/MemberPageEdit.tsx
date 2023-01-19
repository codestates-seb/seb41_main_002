<<<<<<< HEAD
import CustomButton from "../Components/Commons/Buttons";
import {
  getMemberAddressData,
  MemberPageDataType,
} from "../API/MemberPageEditAPI";
import { useEffect, useState } from "react";
=======
import { useState } from "react";
>>>>>>> c6c96ae3161544ba1821e5b6afab577fecea5cff
import styled from "styled-components";
import AddressPopup from "../Components/AddressPopup";
import Modal from "../Components/Commons/Modal";
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
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  return (
    // 추후 데이터 수정 예정
    <div className="Edit_Page_Container">
      <h1 className="Edit_Page_Title">회원정보 수정</h1>
      <ul className="Member_Information_Contents">
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
          <div className="Info_Title">
            <MemberInfoText>
              <button>대표주소 설정</button>
            </MemberInfoText>
          </div>
          <div>
            <MemberInfoText>
              주소Title1: 서울특별시 강서구 화곡동 56-536 501호
            </MemberInfoText>
          </div>
          <AddressEditContainer>
            <button>수정</button>
            <button>삭제</button>
          </AddressEditContainer>
        </MemberInfoContent>
        <MemberInfoContent>
          <div className="Info_Title">
            <MemberInfoText>
              <button>대표주소 설정</button>
            </MemberInfoText>
          </div>
          <div className="Address_Contents">
            <MemberInfoText>
              주소Title1: 서울특별시 강서구 화곡동 56-536 501호
            </MemberInfoText>
          </div>
          <AddressEditContainer>
            <button>수정</button>
            <button>삭제</button>
          </AddressEditContainer>
        </MemberInfoContent>
        <MemberInfoContent>
          <button className="Address_Add_Button" onClick={openModal}>
            주소 추가하기
          </button>
        </MemberInfoContent>
        {modalState ? (
          <Modal
            modalState={modalState}
            setModalState={setModalState}
            element={<AddressPopup />}
          />
        ) : null}
        <div>
          <div className="Edit_Type_Container">
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <select className="Edit_Select_Box">
                {memberAddressData &&
                memberAddressData.tagList[0] === "건성" ? (
                  <option value="건성" selected>
                    건성
                  </option>
                ) : (
                  <option value="건성">건성</option>
                )}
                {memberAddressData &&
                memberAddressData.tagList[0] === "건성" ? (
                  <option value="지성" selected>
                    지성
                  </option>
                ) : (
                  <option value="지성">지성</option>
                )}
                {memberAddressData &&
                memberAddressData.tagList[0] === "복합성" ? (
                  <option value="복합성" selected>
                    복합성
                  </option>
                ) : (
                  <option value="복합성">복합성</option>
                )}
              </select>
            </InfoContent>
          </div>
          <div className="Edit_Type_Container">
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <select className="Edit_Select_Box">
                {memberAddressData &&
                memberAddressData.tagList[1] === "일반 피부" ? (
                  <option value="일반 피부" selected>
                    일반 피부
                  </option>
                ) : (
                  <option value="일반 피부">일반 피부</option>
                )}
                {memberAddressData &&
                memberAddressData.tagList[1] === "여드름성 피부" ? (
                  <option value="여드름성 피부" selected>
                    여드름성 피부
                  </option>
                ) : (
                  <option value="여드름성 피부">여드름성 피부</option>
                )}
              </select>
            </InfoContent>
          </div>
          <div className="Edit_Type_Container">
            <InfoTitle>
              <MemberInfoText>내 피부타입</MemberInfoText>
            </InfoTitle>
            <InfoContent>
              <div className="Checkbox_Wrapper">
                <label>
                  <span className="Checkbox_Tag">미백</span>
                  {memberAddressData &&
                  memberAddressData.tagList.includes("미백") ? (
                    <input type="checkbox" checked />
                  ) : (
                    <input type="checkbox" />
                  )}
                </label>
                <label>
                  <span className="Checkbox_Tag">주름</span>
                  {memberAddressData &&
                  memberAddressData.tagList.includes("주름") ? (
                    <input type="checkbox" checked />
                  ) : (
                    <input type="checkbox" />
                  )}
                </label>
                <label>
                  <span className="Checkbox_Tag">보습</span>
                  {memberAddressData &&
                  memberAddressData.tagList.includes("보습") ? (
                    <input type="checkbox" checked />
                  ) : (
                    <input type="checkbox" />
                  )}
                </label>
                <label>
                  <span className="Checkbox_Tag">모공</span>
                  {memberAddressData &&
                  memberAddressData.tagList.includes("모공") ? (
                    <input type="checkbox" checked />
                  ) : (
                    <input type="checkbox" />
                  )}
                </label>
                <label>
                  <span className="Checkbox_Tag">수분</span>
                  {memberAddressData &&
                  memberAddressData.tagList.includes("수분") ? (
                    <input type="checkbox" checked />
                  ) : (
                    <input type="checkbox" />
                  )}
                </label>
                <label>
                  <span className="Checkbox_Tag">탄력</span>
                  {memberAddressData &&
                  memberAddressData.tagList.includes("탄력") ? (
                    <input type="checkbox" checked />
                  ) : (
                    <input type="checkbox" />
                  )}
                </label>
              </div>
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
              {memberAddressData?.subscribedDate === null
                ? "구독하고 있지 않습니다"
                : memberAddressData?.subscribedDate}
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
