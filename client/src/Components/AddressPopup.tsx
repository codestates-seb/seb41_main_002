import { useEffect, useState } from "react";
import CustomButton from "./Commons/Buttons";
import DaumPostcode from "react-daum-postcode";

export default function AddressPopup() {
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [userAddress, setUserAddress] = useState({
    addressId: 1,
    isPrimary: false,
    recipient: "",
    addressTitle: "",
    zipcode: "",
    address: "",
    phoneNumber: "",
  });
  const [isPrimary, setIsPrimary] = useState(false);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
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

    data.preventDefault();
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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    const newAddressInfo = {
      addressId: 1,
      isPrimary: isPrimary,
      recipient: userAddress.recipient,
      addressTitle: userAddress.addressTitle,
      zipcode: zipcode,
      address: combinedAddress,
      phoneNumber: userAddress.phoneNumber,
    };
    console.log(newAddressInfo);
    event.preventDefault();
  };

  return (
    <form className="Address_Modal" onSubmit={handleSubmit}>
      <h1 className="Address_Header"> 주소를 입력해주세요 </h1>
      {isSearchOn ? <DaumPostcode onComplete={handleComplete} /> : null}
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
              onChange={userAddressHandler}
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
              onChange={userAddressHandler}
            />
          </div>
          <div className="Modal_Form_Buttons">
            <div>
              <input
                type="checkbox"
                value="setPrimary"
                onClick={() => {
                  setIsPrimary(!isPrimary);
                }}
              />
              <label htmlFor="setPrimary">대표 주소로 설정</label>
            </div>
            <input
              type="submit"
              className="Submit_Button"
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </form>
  );
}
