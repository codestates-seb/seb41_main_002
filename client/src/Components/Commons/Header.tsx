import CartIcon from "../../Icons/CartIcon";
import UserIcon from "../../Icons/UserIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../Style/header.css";
import CustomButton from "./Buttons";
import { kakaoRegularPayment } from "../../API/SubscriptionAPI";

export default function Header() {
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);

  const memberId = sessionStorage.getItem("memberId");

  const toggleDropdown = () => {
    setIsDropdownClicked(!isDropdownClicked);
  };

  useEffect(() => {
    const regularPaymentTime = sessionStorage.getItem(
      "regularPayment"
    ) as string;
    if (regularPaymentTime) {
      const nowDate = new Date();
      const setTime =
        nowDate.getTime() - new Date(regularPaymentTime).getTime();
      const timeCalculation = (10 - setTime / 1000) * 1000;

      if (timeCalculation >= 0) {
        setTimeout(function () {
          kakaoRegularPayment();

          setInterval(function () {
            kakaoRegularPayment();
          }, 10000);

        }, timeCalculation);
      } else {
        const Calculation =
          10000 - Math.floor(((-timeCalculation / 1000) % 10) * 1000);
        setTimeout(function () {
          kakaoRegularPayment();

          setInterval(function () {
            kakaoRegularPayment();
          }, 10000);
          
        }, Calculation);
      }
    }
  }, []);

  return (
    <header>
      <nav className="Header_Nav">
        <Link to="/">
          <div className="Header_Logo">L'acier</div>
        </Link>
        <ul className="Nav_List">
          <li className="Nav_Dropdown">
            <button className="Nav_Dropdown_Button" onClick={toggleDropdown}>
              제품
            </button>
            {isDropdownClicked ? (
              <div className="Nav_Dropdown_Content">
                {/* 이후에 선택된 카테고리에 따라 링크 설정 변경이 필요할 예정
                i.e. 스킨/토너 선택 => 상품 페이지 스킨/토너 선택 */}
                <Link to="/items-list" onClick={toggleDropdown}>
                  스킨/토너
                </Link>
                <Link to="/items-list" onClick={toggleDropdown}>
                  크림
                </Link>
                <Link to="/items-list" onClick={toggleDropdown}>
                  로션
                </Link>
                <Link to="/items-list" onClick={toggleDropdown}>
                  클렌징
                </Link>
                <Link to="/items-list" onClick={toggleDropdown}>
                  선크림
                </Link>
              </div>
            ) : null}
          </li>
          <Link to="/items-top-list">
            <li>추천 리스트</li>
          </Link>
          <Link to="/event">
            <li>이벤트</li>
          </Link>
        </ul>
        <div className="Header_Icons">
          <Link to="/members/:memberId/carts">
            <CartIcon name="Header_Icon" />
          </Link>
          {memberId === null ? (
            <Link to="/login">
              <UserIcon name="Header_Icon" />
            </Link>
          ) : (
            <Link to={`/memberPage/${memberId}`}>
              <UserIcon name="Header_Icon" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
