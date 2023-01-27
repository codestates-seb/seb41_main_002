import {
  AddressType,
  MemberPageDataType,
  updateAddress,
} from "../../API/MemberPageEdit/MemberPageEditAPI";
import CustomButton from "../Commons/Buttons";
import { FormEvent, useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "./../Style/addressPopup.css";

const memberId = Number(sessionStorage.getItem("memberId"));

export default function EditAddressModal({
  editingAddress,
  setModalState,
  render,
  setRender,
  setIsEditAddressModalOn,
  memberAddressData,
}: {
  editingAddress: AddressType | undefined;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditAddressModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  memberAddressData: MemberPageDataType;
}) {
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [userAddress, setUserAddress] = useState({
    recipient: memberAddressData.memberName,
    addressTitle: editingAddress?.addressTitle as string,
    phoneNumber: memberAddressData.phoneNumber,
  });
  const [isPrimary, setIsPrimary] = useState(
    editingAddress?.isPrimary as boolean
  );
  const [address, setAddress] = useState(
    editingAddress?.address.slice(
      0,
      editingAddress?.address.indexOf(")") + 1
    ) as string
  );
  const [zipcode, setZipcode] = useState(editingAddress?.zipcode as string);
  const [detailedAddress, setDetailedAddress] = useState(
    editingAddress?.address.slice(
      editingAddress?.address.indexOf(")") + 1,
      editingAddress?.address.length
    ) as string
  );
  const [combinedAddress, setCombinedAddres] = useState("");

  useEffect(() => {
    const wholeAddress = address + detailedAddress;
    setCombinedAddres(wholeAddress);
  }, [{ address, detailedAddress }]);

  // 팝업창 열기
  const openSearch = () => {
    setIsSearchOn(!isSearchOn);
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsSearchOn(!isSearchOn);
    setZipcode(data.zonecode);
    setAddress(fullAddress);
  };

  const userAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserAddress({ ...userAddress, [name]: value });
  };

  const handleDetailedAddress: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setDetailedAddress(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateAddressInfo = {
      isPrimary: isPrimary,
      addressTitle: userAddress.addressTitle,
      zipcode: zipcode,
      address: combinedAddress,
    };

    if (window.confirm("주소 수정을 완료하시겠습니까?")) {
      setModalState(false);
      setIsEditAddressModalOn(false);
      updateAddress(editingAddress?.addressId as number, updateAddressInfo);
      alert("수정 완료");
      setRender(!render);
    }
  };

  return (
    <form className="Address_Modal" onSubmit={handleSubmit}>
      <h1 className="Address_Header"> 주소를 입력해주세요 </h1>
      {isSearchOn ? (
        <DaumPostcode onComplete={handleComplete} autoClose={false} />
      ) : null}
      {isSearchOn ? null : (
        <div>
          <div className="Modal_Field">
            <label htmlFor="">배송지명 </label>
            <input
              type="text"
              value={userAddress.addressTitle}
              name="addressTitle"
              className="Form_Input Address_Type_Field"
              onChange={userAddressHandler}
            />
          </div>
          <div className="Modal_Field">
            <label htmlFor="">수령인 </label>
            <input
              type="text"
              value={userAddress.recipient}
              name="recipient"
              className="Form_Input Address_Type_Field"
              disabled
            />
          </div>
          <div className="Modal_Field">
            <label htmlFor="">주소 </label>
            <input
              type="text"
              className="Form_Input Address_Type_Field"
              value={address}
              readOnly
            />
          </div>
          <div className="Modal_Field">
            <label htmlFor="">우편번호 </label>
            <input
              type="text"
              className="Form_Input Address_Zipcode"
              value={zipcode}
              readOnly
            />
            <CustomButton
              bgColor="white"
              content={isSearchOn ? "닫기" : "도로명 검색"}
              fontColor="black"
              padding="10px"
              width="125px"
              type="button"
              onClick={openSearch}
            />
          </div>
          <div className="Modal_Field">
            <label htmlFor="">상세 주소 </label>
            <input
              type="text"
              value={detailedAddress}
              className="Form_Input Address_Type_Field"
              onChange={handleDetailedAddress}
            />
          </div>
          <div className="Modal_Field">
            <label htmlFor="">연락처 </label>
            <input
              type="text"
              maxLength={13}
              value={userAddress.phoneNumber
                .replace(/[^0-9]/g, "")
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                .replace(/(\-{1,2})$/g, "")}
              name="phoneNumber"
              className="Form_Input Address_Type_Field"
              disabled
            />
          </div>
          <div className="Modal_Form_Buttons">
            <div>
              {isPrimary ? (
                <input
                  type="checkbox"
                  defaultChecked
                  onClick={() => {
                    setIsPrimary(!isPrimary);
                  }}
                />
              ) : (
                <input
                  type="checkbox"
                  value="setPrimary"
                  onClick={() => {
                    setIsPrimary(!isPrimary);
                  }}
                />
              )}
              <label htmlFor="setPrimary">대표 주소로 설정</label>
            </div>
            <input type="submit" className="Submit_Button" />
          </div>
        </div>
      )}
    </form>
  );
}
