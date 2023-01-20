import CustomButton from "../Components/Commons/Buttons";
import {
  getMemberAddressData,
  MemberPageDataType,
} from "../API/MemberPageEditAPI";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddressPopup from "../Components/AddressPopup";
import Modal from "../Components/Commons/Modal";
import "./Style/memberPageEdit.css";
import { Link } from "react-router-dom";

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 75px;
  background-color: var(--dark3);
  border-bottom: 1px solid white;

  &:last-child {
    border: none;
  }
`;

const div = styled.span`
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

// 이후 리덕스를 활용한 전역 상태 활용 시 삭제
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
    <>
      {/* 최상단에 모달 창 배치를 통해 위치 고정 */}
      {modalState ? (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          element={<AddressPopup />}
        />
      ) : null}
      <section className="Edit_Page_Container">
        <h1 className="Edit_Page_Title">회원정보 수정</h1>
        <div className="Member_Information_Contents">
          <InfoWrapper>
            <div className="Info_Label">ID</div>
            <div className="Info_Content">
              {memberAddressData && memberAddressData.accountId}
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">PW</div>
            <div className="Info_Content">**********</div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">이름</div>
            <div className="Info_Content">
              {memberAddressData && memberAddressData.memberName}
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">생년월일</div>
            <div className="Info_Content">
              {memberAddressData && memberAddressData.birthdate}
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">이메일</div>
            <div className="Info_Content">
              {memberAddressData && memberAddressData.email}
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">핸드폰 번호</div>
            <div className="Info_Content">
              {memberAddressData && memberAddressData.phoneNumber}
            </div>
          </InfoWrapper>
          <ul className="Edit_Page_Addresses">
            <h2 className="Info_Title">내 배송지</h2>
            {memberAddressData &&
            memberAddressData?.addressList.length === 0 ? (
              <div className="No_Addresses"> 배송지 없음 </div>
            ) : (
              <div className="Addresses_Container">
                {memberAddressData &&
                  memberAddressData.addressList.map((address) => {
                    return (
                      <li className="Address_List_Item">
                        <CustomButton
                          bgColor="transparent"
                          content="대표주소 설정"
                          fontColor="skyblue"
                          padding="5px"
                          width="150px"
                          border="none"
                          onClick={openModal}
                        />
                        <div className="Address_List_Address">
                          <div>
                            {address.isPrimary ? "대표 주소: " : "주소: "}
                            {`${address.addressTitle} ${address.address} (${address.zipcode})`}
                          </div>
                        </div>
                        <div className="Address_List_Button">
                          <CustomButton
                            bgColor="transparent"
                            content="수정"
                            fontColor="skyblue"
                            padding="5px"
                            border="none"
                            width="75px"
                          />
                          <CustomButton
                            bgColor="transparent"
                            content="삭제"
                            fontColor="skyblue"
                            padding="5px"
                            border="none"
                            width="75px"
                          />
                        </div>
                      </li>
                    );
                  })}
              </div>
            )}

            {/* 더미데이터 */}
            {/* <li className="Address_List_Item">
              <CustomButton
                bgColor="transparent"
                content="대표주소 설정"
                fontColor="skyblue"
                padding="5px"
                width="150px"
                border="none"
                onClick={openModal}
              />
              <div className="Address_List_Address">
                <div> 주소: 서울특별시 강서구 화곡동 56-536 501호</div>
              </div>
              <div className="Address_List_Button">
                <CustomButton
                  bgColor="transparent"
                  content="수정"
                  fontColor="skyblue"
                  padding="5px"
                  border="none"
                  width="75px"
                />
                <CustomButton
                  bgColor="transparent"
                  content="삭제"
                  fontColor="skyblue"
                  padding="5px"
                  border="none"
                  width="75px"
                />
              </div>
            </li> */}

            <CustomButton
              bgColor="transparent"
              content="배송지 추가"
              fontColor="skyblue"
              padding="10px"
              width="125px"
              border="white 1px solid"
              onClick={openModal}
            />
          </ul>

          <div className="My_Type_Wrapper">
            <h2 className="Info_Title">내 맞춤 설정</h2>
            <InfoWrapper>
              <div className="Info_Label">피지 타입</div>
              <div className="Info_Content">
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
              </div>
            </InfoWrapper>
            <InfoWrapper>
              <div className="Info_Label">피부 타입</div>
              <div className="Info_Content">
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
              </div>
            </InfoWrapper>
            <InfoWrapper>
              <div className="Info_Label">관심 분야</div>
              <div className="Info_Content">
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
              </div>
            </InfoWrapper>
          </div>
        </div>
        <div className="Edit_Button_Wrap">
          <CustomButton
            bgColor="white"
            content="수정 완료"
            fontColor="black"
            padding="10px"
            fontsize="19px"
            width="125px"
          />
        </div>
        <div className="Subscribe_Edit_Container">
          <h2 className="Info_Title">구독 여부</h2>

          {memberAddressData?.subscribedDate === null ? (
            <div>
              <div className="No_Subscription">구독하고 있지 않습니다.</div>
              <Link to="/members/:memberId/subscribe">
                <CustomButton
                  bgColor="transparent"
                  content="지금 구독하세요!"
                  fontColor="skyblue"
                  padding="15px"
                  fontsize="19px"
                  width="200px"
                />
              </Link>
            </div>
          ) : (
            <div>
              <InfoWrapper>
                <div className="Info_Label">구독 시작일</div>
                <div className="Info_Content">
                  {memberAddressData?.subscribedDate}
                </div>
              </InfoWrapper>
              <InfoWrapper>
                <div className="Info_Label">지금까지 받은 혜택</div>
                <div className="Info_Content">
                  <div>구독일로부터</div>
                  <div>4개의 샘플</div>
                  <div>4개의 샘플</div>
                  <div>4개의 샘플</div>
                </div>
              </InfoWrapper>
              <InfoWrapper>
                <CustomButton
                  bgColor="transparent"
                  content="구독 취소"
                  fontColor="tomato"
                  padding="10px"
                  border="none"
                  width="100px"
                />
              </InfoWrapper>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
