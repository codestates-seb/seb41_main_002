import {
  AddressType,
  cancelSubscription,
  deleteAddress,
  getMemberData,
  MemberPageDataType,
  updateAddress,
  updateMemberData,
} from "../API/MemberPageEdit/MemberPageEditAPI";
import CustomButton from "../Components/Commons/Buttons";
import Modal from "../Components/Commons/Modal";
import NewAddressModal from "../Components/MemberPageEdit/NewAddressModal";
import EditAddressModal from "../Components/MemberPageEdit/EditAddressModal";
import { subscriptionCalculation } from "../Function/memberEditPage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Style/memberPageEdit.css";

const InfoWrapper = styled.div`
  position: relative;
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

const memberId = Number(sessionStorage.getItem("memberId"));

export default function MemberPageEdit() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const [isNewAddressModalOn, setIsNewAddressModalOn] = useState(false);
  const [isEditAddressModalOn, setIsEditAddressModalOn] = useState(false);

  const [memberAddressData, setMemberAddressData] =
    useState<MemberPageDataType>();
  const [memberName, setMemberName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [tagList, setTagList] = useState<string[] | undefined>([]);
  const [render, setRender] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType>(
    memberAddressData?.addressList[0] as AddressType
  );

  const calcMonth = subscriptionCalculation(
    memberAddressData?.subscribedDate as string
  );

  useEffect(() => {
    if (modalState === false) {
      setIsEditAddressModalOn(false);
      setIsNewAddressModalOn(false);
    }
  }, [modalState]);

  useEffect(() => {
    try {
      getMemberData(memberId).then((res) => {
        setRender(true);
        setMemberAddressData(res);
        setMemberName(res?.memberName as string);
        setEmail(res?.email as string);
        setPhoneNumber(res?.phoneNumber as string);
        setTagList(res?.tagList as string[]);
      });
    } catch (err) {
      console.error(err);
    }
  }, [render]);

  const toResetPW = () => {
    if (window.confirm("??????????????? ?????????????????????????")) {
      navigate("/resetPw");
    }
  };

  const handleMemberName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMemberName(e.target.value);
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
    const sebumType = ["??????", "?????????", "??????"];
    const skinType = ["????????????", "???????????? ??????"];

    if (sebumType.includes(e.target.value) && tagList) {
      tagList[0] = e.target.value;
    }
    if (skinType.includes(e.target.value) && tagList) {
      tagList[1] = e.target.value;
    }
  };

  const editSkinTag: React.MouseEventHandler<HTMLInputElement> = (e) => {
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

  const setPrimaryAddress: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const addressId = Number(e.currentTarget.name);
    const addressListIndex = Number(e.currentTarget.id);

    const addressData = {
      isPrimary: true,
      addressTitle: memberAddressData?.addressList[addressListIndex]
        .addressTitle as string,
      zipcode: memberAddressData?.addressList[addressListIndex]
        .zipcode as string,
      address: memberAddressData?.addressList[addressListIndex]
        .address as string,
    };
    if (window.confirm("?????? ????????? ?????????????????????????")) {
      updateAddress(addressId, addressData);
      setRender(!render);
      alert("??????????????? ?????? ??????");
    }
  };

  const addNewAddress: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsNewAddressModalOn(true);
    setModalState(true);
  };

  const editAddress: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const addressListIndex = Number(e.currentTarget.id);
    setEditingAddress(
      memberAddressData?.addressList[addressListIndex] as AddressType
    );
    setIsEditAddressModalOn(true);
    setModalState(true);
  };

  const removeAddress: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const addressId = Number(e.currentTarget.name);

    if (window.confirm("?????? ???????????? ?????????????????????????")) {
      deleteAddress(addressId);
      setRender(!render);
      alert("????????? ?????????????????????.");
    }
  };

  const submitEdit = () => {
    const reqBody = {
      memberName: memberName as string,
      email: email as string,
      phoneNumber: phoneNumber as string,
      tagList: tagList as string[],
    };

    if (window.confirm("?????????????????????????")) {
      if (email?.includes("@") === false) {
        alert("???????????? ?????????(@)??? ???????????? ?????????.");
      } else if (phoneNumber?.slice(0, 3) !== "010") {
        alert("????????? ????????? 010?????? ???????????? ?????????.");
      } else if (phoneNumber?.length !== 13) {
        alert("????????? ????????? 010??? ????????? ??? 11????????? ????????? ?????????.");
      } else {
        updateMemberData(memberId, reqBody).then(() => {
          setRender(!render);
          alert("?????? ??????");
          navigate(`/memberPage/${memberId}`);
        });
      }
    }
  };

  const stopSubscription = () => {
    if (window.confirm("?????? ????????? ?????????????????????????")) {
      cancelSubscription(memberId);
      setRender(!render);
      sessionStorage.setItem("isSubscribed", "false");
      sessionStorage.removeItem("regularPayment");
      alert("????????? ?????????????????????.");
    }
  };

  return (
    <>
      {isNewAddressModalOn
        ? modalState && (
            <Modal
              modalState={modalState}
              setModalState={setModalState}
              element={
                <NewAddressModal
                  setModalState={setModalState}
                  currentAddressIndex={
                    memberAddressData?.addressList.length as number
                  }
                  render={render}
                  setRender={setRender}
                  setIsNewAddressModalOn={setIsNewAddressModalOn}
                  memberAddressData={memberAddressData as MemberPageDataType}
                />
              }
            />
          )
        : null}
      {isEditAddressModalOn
        ? modalState && (
            <Modal
              modalState={modalState}
              setModalState={setModalState}
              element={
                <EditAddressModal
                  setModalState={setModalState}
                  editingAddress={editingAddress}
                  render={render}
                  setRender={setRender}
                  setIsEditAddressModalOn={setIsEditAddressModalOn}
                  memberAddressData={memberAddressData as MemberPageDataType}
                />
              }
            />
          )
        : null}

      <section className="Edit_Page_Container">
        <h1 className="Edit_Page_Title">???????????? ??????</h1>
        <div className="Member_Information_Wrapper">
          <InfoWrapper>
            <div className="Info_Label">ID</div>
            <div className="Info_Content">
              {memberAddressData && memberAddressData.accountId}
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">PW</div>
            <div className="Info_Content">
              <CustomButton
                bgColor="transparent"
                content="???????????? ??????"
                fontColor="var(--indicatorColor1)"
                padding="10px"
                width="150px"
                border="none"
                onClick={toResetPW}
                hoverColor="var(--hoverColor3)"
                fontsize="21px"
              />
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">??????</div>
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
            <div className="Info_Label">????????????</div>
            <div className="Info_Content">
              {memberAddressData && memberAddressData.birthdate}
            </div>
          </InfoWrapper>
          <InfoWrapper>
            <div className="Info_Label">?????????</div>
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
            <div className="Info_Label">????????? ??????</div>
            <div className="Info_Content">
              <input
                className="Info_Input"
                type="text"
                maxLength={13}
                value={phoneNumber}
                onChange={handlePhoneNumber}
                required
              />
            </div>
          </InfoWrapper>
          <ul className="Member_Information_Addresses">
            <h2 className="Info_Title">??? ?????????</h2>

            {memberAddressData &&
            memberAddressData?.addressList.length === 0 ? (
              <div className="No_Addresses"> ????????? ?????? </div>
            ) : (
              <div className="Addresses_Container">
                {memberAddressData &&
                  memberAddressData.addressList.map((address, idx) => {
                    return (
                      <li className="Address_List_Item" key={`address${idx}`}>
                        <div className="Address_List_Address">
                          <div>
                            {address.isPrimary ? (
                              <span className="Addrress_Primary">
                                (????????????)
                              </span>
                            ) : null}
                            {` ${address.addressTitle} : ${address.address} (${address.zipcode})`}
                          </div>
                        </div>
                        <div className="Address_List_Button">
                          {address.isPrimary ? null : (
                            <CustomButton
                              bgColor="transparent"
                              content="???????????? ??????"
                              fontColor="var(--indicatorColor1)"
                              padding="5px"
                              width="125px"
                              border="none"
                              buttonId={idx.toString()}
                              idx={address.addressId.toString()}
                              onClick={setPrimaryAddress}
                              hoverColor="var(--hoverColor3)"
                            />
                          )}
                          <CustomButton
                            bgColor="transparent"
                            content="??????"
                            fontColor="var(--indicatorColor1)"
                            padding="5px"
                            border="none"
                            width="50px"
                            buttonId={idx.toString()}
                            idx={address.addressId.toString()}
                            onClick={editAddress}
                            hoverColor="var(--hoverColor3)"
                          />
                          <CustomButton
                            bgColor="transparent"
                            content="??????"
                            fontColor="var(--indicatorColor1)"
                            padding="5px"
                            border="none"
                            width="50px"
                            buttonId={idx.toString()}
                            idx={address.addressId.toString()}
                            onClick={removeAddress}
                            hoverColor="var(--hoverColor3)"
                          />
                        </div>
                      </li>
                    );
                  })}
              </div>
            )}

            <CustomButton
              bgColor="transparent"
              content="????????? ??????"
              fontColor="var(--indicatorColor1)"
              padding="10px"
              width="125px"
              border="none"
              onClick={addNewAddress}
              hoverColor="var(--hoverColor3)"
              fontsize="21px"
            />
          </ul>

          {memberAddressData && memberAddressData.tagList.length === 0 ? (
            <div className="My_Type_Wrapper Recommend_Survey">
              <p>?????? ?????? ????????? ???????????? ???????????????.</p>
              <div>
                <Link to={`/skin-test/${memberId}`}>
                  <CustomButton
                    bgColor="transparent"
                    content="?????? ????????????????"
                    fontColor="var(--indicatorColor1)"
                    padding="10px"
                    fontsize="19px"
                    border="none"
                    width="200px"
                    hoverColor="var(--hoverColor3)"
                  />
                </Link>
              </div>
            </div>
          ) : (
            <div className="My_Type_Wrapper">
              <h2 className="Info_Title">??? ?????? ??????</h2>
              <InfoWrapper>
                <div className="Info_Label">?????? ??????</div>
                <div className="Info_Content">
                  <select className="Type_Dropdown" onChange={editSkinType}>
                    {tagList && tagList[0] === "??????" ? (
                      <option value="??????" selected>
                        ??????
                      </option>
                    ) : (
                      <option value="??????">??????</option>
                    )}
                    {tagList && tagList[0] === "??????" ? (
                      <option value="??????" selected>
                        ??????
                      </option>
                    ) : (
                      <option value="??????">??????</option>
                    )}
                    {tagList && tagList[0] === "?????????" ? (
                      <option value="?????????" selected>
                        ?????????
                      </option>
                    ) : (
                      <option value="?????????">?????????</option>
                    )}
                  </select>
                </div>
              </InfoWrapper>
              <InfoWrapper>
                <div className="Info_Label">?????? ??????</div>
                <div className="Info_Content">
                  <select className="Type_Dropdown" onChange={editSkinType}>
                    {tagList && tagList[1] === "????????????" ? (
                      <option value="????????????" selected>
                        ????????????
                      </option>
                    ) : (
                      <option value="????????????">????????????</option>
                    )}
                    {tagList && tagList[1] === "???????????? ??????" ? (
                      <option value="???????????? ??????" selected>
                        ???????????? ??????
                      </option>
                    ) : (
                      <option value="???????????? ??????">???????????? ??????</option>
                    )}
                  </select>
                </div>
              </InfoWrapper>
              <InfoWrapper>
                <div className="Info_Label">?????? ??????</div>
                <div className="Info_Content">
                  <ul className="Checkbox_Wrapper">
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">??????</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("??????") ? (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">??????</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("??????") ? (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">??????</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("??????") ? (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">??????</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("??????") ? (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">??????</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("??????") ? (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                        />
                      )}
                    </li>
                    <li className="Checkbox_List_Item">
                      <span className="Checkbox_Tag">??????</span>
                      {memberAddressData &&
                      memberAddressData.tagList.includes("??????") ? (
                        <input
                          type="checkbox"
                          name="??????"
                          onClick={editSkinTag}
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          name="??????"
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
            content="?????? ??????"
            fontColor="black"
            padding="10px"
            fontsize="19px"
            width="125px"
            onClick={submitEdit}
            type="submit"
            hoverColor="var(--hoverColor1)"
          />
        </div>
        <div className="Subscribe_Edit_Container">
          <h2 className="Info_Title">?????? ??????</h2>
          {memberAddressData?.isSubscribed === false ? (
            <div className="Recommend_Subscription">
              <div className="No_Subscription">???????????? ?????? ????????????.</div>
              <Link to={`/members/${memberId}/subscribe`}>
                <CustomButton
                  bgColor="white"
                  content="?????? ???????????????!"
                  fontColor="black"
                  padding="15px"
                  fontsize="19px"
                  width="200px"
                  hoverColor="var(--hoverColor1)"
                />
              </Link>
            </div>
          ) : (
            <div>
              <InfoWrapper>
                <div className="Info_Label">?????? ?????????</div>
                <div className="Info_Content">
                  {memberAddressData?.subscribedDate.slice(0, 4)}???{" "}
                  {memberAddressData?.subscribedDate.slice(5, 7)}???{" "}
                  {memberAddressData?.subscribedDate.slice(8, 10)}???
                </div>
              </InfoWrapper>
              <div className="Subscription_Summary">
                <div className="Info_Label">???????????? ?????? ??????</div>
                <div className="Subscription_Benefit">
                  <div>??????????????????</div>
                  <span>{calcMonth * 5}?????? ??????/?????? ??????</span>
                  <span>{calcMonth * 2}?????? ?????? ??????</span>
                  <span>{calcMonth * 3}?????? ?????? ??????</span>??? ???????????????.
                </div>
              </div>
              <InfoWrapper>
                <CustomButton
                  bgColor="transparent"
                  content="?????? ??????"
                  fontColor="gray"
                  padding="15px"
                  border="none"
                  fontsize="19px"
                  width="125px"
                  onClick={stopSubscription}
                  hoverColor="tomato"
                />
              </InfoWrapper>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
