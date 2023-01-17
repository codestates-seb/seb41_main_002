import { useState } from "react";
import CustomButton from "./Commons/Buttons";

export default function AddressPopup() {
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsSearchPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsSearchPopupOpen(false);
  };

  return (
    <div>
      <div>도로명 입력</div>
      <CustomButton
        bgColor="white"
        content="도로명 검색"
        fontColor="black"
        padding="5px"
        width="150px"
        onClick={openPostCode}
      />
    </div>
  );
}
