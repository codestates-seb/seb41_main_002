import CustomButton from "../Components/Commons/Buttons";
import {
  getMemberAddressData,
  MemberPageDataType,
  updateMemberAddressData,
} from "../API/MemberPageEdit/MemberPageEditAPI";
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

// 이후 리덕스를 활용한 전역 상태 활용 시 삭제
const session = {
  accountId: "shim5505",
  memberId: 1,
};

export default function MemberPageEdit() {
  const [modalState, setModalState] = useState(false);

  const [memberAddressData, setMemberAddressData] = useState<
    MemberPageDataType | undefined
  >({
    accountId: "",
    memberName: "",
    birthdate: "",
    email: "",
    phoneNumber: "",
    addressList: [],
    tagList: [],
    isSubscribed: false,
    subscribedDate: "",
    nowDate: "",
    sampleCount: 0,
    totalDeliveryDiscount: 0,
    reserveProfit: 0,
  });
  const [memberName, setMemberName] = useState<string | undefined>("");
  const [birthdate, setBirthDate] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [tagList, setTagList] = useState<string[] | undefined>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>(true);

  const [newAddressId, setNewAddressId] = useState(0);

  useEffect(() => {
    try {
      getMemberAddressData(session.memberId).then((res) => {
        // console.log(res);
        setMemberAddressData(res);
        setMemberName(res?.memberName);
        setBirthDate(res?.birthdate);
        setEmail(res?.email);
        setPhoneNumber(res?.phoneNumber);
        setTagList(res?.tagList);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const openModal = () => {
    setModalState(true);
  };

  const handleMemberName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMemberName(e.target.value);
  };

  const handleBirthDate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBirthDate(e.target.value);
  };

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumber: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(
      e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };

  const editSkinType: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    // 검사를 위한 값
    const sebumType = ["건성", "복합성", "지성"];
    const skinType = ["일반 피부", "여드름성 피부"];

    // 1, 2 번째 필드값 변동시 tagList 변경
    if (sebumType.includes(e.target.value) && tagList) {
      tagList[0] = e.target.value;
    }
    if (skinType.includes(e.target.value) && tagList) {
      tagList[1] = e.target.value;
    }
  };

  const editSkinTag: React.MouseEventHandler<HTMLInputElement> = (e) => {
    const tagType = ["미백", "주름", "보습", "모공", "수분", "탄력"];
    const currentTag = e.currentTarget.name;

    if (tagList && tagList.includes(currentTag) === false) {
      tagList.push(currentTag);
    } else if (tagList && tagList.includes(currentTag)) {
      const index = tagList.indexOf(currentTag);
      if (index > -1) {
        tagList.splice(index, 1);
      }
    }
  };

  const submitEdit = () => {
    const reqBody = {
      memberName: memberName as string,
      email: email as string,
      phoneNumber: phoneNumber as string,
      tagList: tagList as string[],
    };
    updateMemberAddressData(session.memberId, reqBody);
  };

  const cancelSubscription = () => {
    if (window.confirm("정말 구독을 취소하시겠습니까?")) {
      alert("구독이 취소되었습니다.");
      setIsSubscribed(false);
    }
  };

  return (
    <>
      {/* 최상단에 모달 창 배치를 통해 위치 고정 */}
      {modalState ? (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          element={<AddressPopup newAddressId={newAddressId} />}
        />
      ) : null}
      <section className="Edit_Page_Container">
        <h1 className="Edit_Page_Title">회원정보 수정</h1>
        <div className="Member_Information_Wrapper">
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
            {/* <div className="Info_Content">
              {memberAddressData && memberAddressData.memberName}
            </div> */}
            <div className="Info_Content">
              <input
                className="Info_Input"
                type="text"
                value={memberName}
                onChange={handleMemberName}
              />
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">생년월일</div>
            <div className="Info_Content">
              <input
                className="Info_Input"
                type="text"
                value={birthdate}
                onChange={handleBirthDate}
              />
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">이메일</div>
            <div className="Info_Content">
              <input
                className="Info_Input"
                type="text"
                value={email}
                onChange={handleEmail}
              />
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">핸드폰 번호</div>
            <div className="Info_Content">
              <input
                className="Info_Input"
                type="text"
                maxLength={13}
                value={phoneNumber}
                onChange={handlePhoneNumber}
              />
            </div>
          </InfoWrapper>
          <ul className="Member_Information_Addresses">
            <h2 className="Info_Title">내 배송지</h2>

            {memberAddressData &&
            memberAddressData?.addressList.length === 0 ? (
              <div className="No_Addresses"> 배송지 없음 </div>
            ) : (
              <div className="Addresses_Container">
                {/* Address_List_Address, Address_List_Button은 현재 적용되는 CSS가 없지만 이후 디자인이 바뀔 가능성이 있어 class명을 사용해 분류 */}
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

            <CustomButton
              bgColor="transparent"
              content="배송지 추가"
              fontColor="skyblue"
              padding="10px"
              width="125px"
              border="none"
              onClick={openModal}
            />
          </ul>

          {memberAddressData && memberAddressData.tagList.length === 0 ? (
            <div className="My_Type_Wrapper Recommend_Survey">
              <p>피부 타입 검사를 실행하지 않았습니다.</p>
              <div>
                <Link to="/">
                  <CustomButton
                    bgColor="transparent"
                    content="나의 피부타입은?"
                    fontColor="rgb(243, 194, 35)"
                    padding="10px"
                    fontsize="19px"
                    border="none"
                    width="200px"
                  />
                </Link>
              </div>
            </div>
          ) : (
            <div className="My_Type_Wrapper">
              <h2 className="Info_Title">내 맞춤 설정</h2>
              <InfoWrapper>
                <div className="Info_Label">피지 타입</div>
                <div className="Info_Content">
                  <select
                    className="Type_Dropdown"
                    defaultValue={
                      memberAddressData && memberAddressData.tagList[0]
                    }
                    onChange={editSkinType}
                  >
                    <option value="건성">건성</option>
                    <option value="지성">지성</option>
                    <option value="복합성">복합성</option>
                  </select>
                </div>
              </InfoWrapper>
              <InfoWrapper>
                <div className="Info_Label">피부 타입</div>
                <div className="Info_Content">
                  <select
                    className="Type_Dropdown"
                    defaultValue={
                      memberAddressData && memberAddressData.tagList[1]
                    }
                    onChange={editSkinType}
                  >
                    <option value="일반 피부">일반 피부</option>
                    <option value="여드름성 피부">여드름성 피부</option>
                  </select>
                </div>
              </InfoWrapper>
              {/* Checkbox_List_Item은 현재 적용되는 CSS가 없지만 이후 디자인이 바뀔 가능성이 있어 class명을 사용해 분류 */}
              <InfoWrapper>
                <div className="Info_Label">관심 분야</div>
                <div className="Info_Content">
                  <ul className="Checkbox_Wrapper">
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">미백</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("미백") ? (
                        <input
                          type="checkbox"
                          name="미백"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="미백"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">주름</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("주름") ? (
                        <input
                          type="checkbox"
                          name="주름"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="주름"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">보습</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("보습") ? (
                        <input
                          type="checkbox"
                          name="보습"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="보습"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">모공</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("모공") ? (
                        <input
                          type="checkbox"
                          name="모공"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="모공"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">수분</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("수분") ? (
                        <input
                          type="checkbox"
                          name="수분"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="수분"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">탄력</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("탄력") ? (
                        <input
                          type="checkbox"
                          name="탄력"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="탄력"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                  </ul>
                </div>
              </InfoWrapper>
            </div>
          )}
        </div>
        <div className="Edit_Button_Wrap">
          <CustomButton
            bgColor="white"
            content="수정 완료"
            fontColor="black"
            padding="10px"
            fontsize="19px"
            width="125px"
            onClick={submitEdit}
          />
        </div>
        <div className="Subscribe_Edit_Container">
          <h2 className="Info_Title">구독 여부</h2>
          {memberAddressData?.isSubscribed === false ? (
            <div className="Recommend_Subscription">
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
              <div className="Subscription_Summary">
                <div className="Info_Label">지금까지 받은 혜택</div>
                <div className="Subscription_Benefit">
                  <div>구독일로부터</div>
                  <span>개의 샘플</span>
                  <span>4개의 샘플</span>
                  <span>4개의 샘플</span>
                  {/* 1. 매월 고객님의 피부타입에 맞춘 5개의 토너 및 로션 샘플과 2개의 세안샘플, 그리고 3종류의 앰플 샘플을 무작위로 받아 볼 수 있습니다. */}
                </div>
              </div>
              <InfoWrapper>
                <CustomButton
                  bgColor="transparent"
                  content="구독 취소"
                  fontColor="tomato"
                  padding="15px"
                  border="none"
                  fontsize="19px"
                  width="125px"
                  onClick={cancelSubscription}
                />
              </InfoWrapper>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
