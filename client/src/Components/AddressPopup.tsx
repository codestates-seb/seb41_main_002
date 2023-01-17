import { useState } from "react";
import CustomButton from "./Commons/Buttons";

export default function AddressPopup() {
  const [isSearchOn, setIsSearchOn] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsSearchOn(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsSearchOn(false);
  };

  return (
    <form className="Address_Modal">
      <h1 className="Address_Header"> 주소 추가 </h1>
      <div className="Modal_Field">
        <label htmlFor="">배송지명 </label>
        <input type="text" className="Address_Input Address_Type_Field" />
      </div>
      <div className="Modal_Field">
        <label htmlFor="">수령인 </label>
        <input type="text" className="Address_Input Address_Type_Field" />
      </div>
      <div className="Modal_Field">
        <label htmlFor="">주소 </label>
        <input
          type="text"
          className="Address_Input Address_Search_Bar"
          readOnly
        />
        <CustomButton
          bgColor="white"
          content="도로명 검색"
          fontColor="black"
          padding="10px"
          width="125px"
          onClick={openPostCode}
        />
      </div>
      <div className="Modal_Field">
        <label htmlFor="">상세 주소 </label>
        <input type="text" className="Address_Input Address_Type_Field" />
      </div>
      <div className="Modal_Field">
        <label htmlFor="">연락처 </label>
        <input type="text" className="Address_Input Address_Type_Field" />
      </div>
      <input type="submit" className="Submit_Button" />
    </form>
  );
}
