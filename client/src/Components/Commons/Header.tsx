import CartIcon from "../../Icons/CartIcon";
import UserIcon from "../../Icons/UserIcon";
import { onLogout } from "../../API/LogoutAPI";
import LogoutIcon from "../../Icons/LogoutIcon";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { kakaoRegularPayment } from "../../API/SubscriptionAPI";
import "./../Style/header.css";

export default function Header() {
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [isCheckBoxClicked, setIsCheckBoxClicked] = useState(false);

  const memberId = sessionStorage.getItem("memberId");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsCheckBoxClicked(!isCheckBoxClicked);
    setIsDropdownClicked(!isDropdownClicked);
  };

  const time = 60;

  useEffect(() => {
    const regularPaymentTime = sessionStorage.getItem(
      "regularPayment"
    ) as string;
    if (regularPaymentTime !== "" && regularPaymentTime) {
      const nowDate = new Date();
      const setTime =
        nowDate.getTime() - new Date(regularPaymentTime).getTime();
      const timeCalculation = (time - setTime / 1000) * 1000;
      if (timeCalculation >= 0) {
        setTimeout(function () {
          kakaoRegularPayment();

          setInterval(function () {
            kakaoRegularPayment();
          }, time * 1000);
        }, timeCalculation);
      } else {
        const Calculation =
          time * 1000 - Math.floor(((-timeCalculation / 1000) % 10) * 1000);
        setTimeout(function () {
          kakaoRegularPayment();

          setInterval(function () {
            kakaoRegularPayment();
          }, time * 1000);
        }, Calculation);
      }
    }
  }, []);
  const userLogOut = () => {
    onLogout().then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  const itemList = [
    {
      itemNameEN: "toner",
      itemNameKR: "스킨/토너",
    },
    {
      itemNameEN: "cream",
      itemNameKR: "크림",
    },
    {
      itemNameEN: "lotion",
      itemNameKR: "로션",
    },
    {
      itemNameEN: "cleansing",
      itemNameKR: "클렌징",
    },
    {
      itemNameEN: "suncream",
      itemNameKR: "선크림",
    },
  ];

  return (
    <header>
      <div className="Contents_Wrap">
        <nav className="Header_Nav">
          <div className="Nav_Menu">
            <label className="Nav_Btn" htmlFor="Nav_Menu">
              <input
                type="checkbox"
                id="Nav_Menu"
                checked={isCheckBoxClicked}
                onChange={toggleDropdown}
              />
              <span></span>
              <span></span>
              <span></span>
            </label>
            {isDropdownClicked ? (
              <ul className="Nav_List">
                <li onClick={toggleDropdown}>
                  <Link to="/items-list/all">제품</Link>
                </li>
                <li>
                  <div className="Nav_Line"></div>
                </li>
                {itemList.map((item, index) => {
                  return (
                    <li key={index} onClick={toggleDropdown}>
                      <Link to={`/items-list/${item.itemNameEN}`}>
                        {item.itemNameKR}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <div className="Nav_Line"></div>
                </li>
                <li onClick={toggleDropdown}>
                  <Link to="/items-top-list/all">추천 리스트</Link>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="Header_Logo">
            <Link to="/">L'acier</Link>
          </div>
          <div className="Header_Icons">
            {memberId === null ? (
              <Link to="/login">
                <UserIcon name="Header_Icon" />
              </Link>
            ) : (
              <>
                <Link to={`/memberPage/${memberId}`}>
                  <UserIcon name="Header_Icon" />
                </Link>
                <Link to={`/members/${memberId}/carts`}>
                  <CartIcon name="Header_Icon" />
                </Link>
                <div onClick={userLogOut}>
                  <LogoutIcon name="Header_Icon" />
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
