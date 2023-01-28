import CartIcon from "../../Icons/CartIcon";
import UserIcon from "../../Icons/UserIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "../../Icons/LogoutIcon";
import { onLogout } from "../../API/LogoutAPI";
import "./../Style/header.css";

export default function Header() {
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [isCheckBoxClick, setIsCheckBoxClick] = useState(false);

  const memberId = sessionStorage.getItem("memberId");

  const toggleDropdown = () => {
    setIsCheckBoxClick(!isCheckBoxClick);
    setIsDropdownClicked(!isDropdownClicked);
  };

  const userLogOut = () => {
    onLogout().then(() => {
      window.location.reload();
    });
  };
  
  return (
    <header>
      <nav className="Header_Nav">
        <div className="Nav_Menu">
          <label className="Nav_Btn" htmlFor="Nav_Menu">
            <input
              type="checkbox"
              id="Nav_Menu"
              checked={isCheckBoxClick}
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
              <li onClick={toggleDropdown}>
                <Link to="/items-list/toner">스킨/토너</Link>
              </li>
              <li onClick={toggleDropdown}>
                <Link to="/items-list/cream">크림</Link>
              </li>
              <li onClick={toggleDropdown}>
                <Link to="/items-list/lotion">로션</Link>
              </li>
              <li onClick={toggleDropdown}>
                <Link to="/items-list/cleansing">클렌징</Link>
              </li>
              <li onClick={toggleDropdown}>
                <Link to="/items-list/suncream">선크림</Link>
              </li>
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
    </header>
  );
}
