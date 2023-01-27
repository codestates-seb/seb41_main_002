import CartIcon from "../../Icons/CartIcon";
import UserIcon from "../../Icons/UserIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./../Style/header.css";
import CustomButton from "./Buttons";
import LogoutIcon from "../../Icons/LogoutIcon";

export default function Header() {
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);

  const memberId = sessionStorage.getItem("memberId");

  const toggleDropdown = () => {
    setIsDropdownClicked(!isDropdownClicked);
  };

  const userLogOut = () => {
    console.log("ㅎㅇ");
  };
  return (
    <header>
      <nav className="Header_Nav">
        <div className="Nav_Menu">
          <label className="Nav_Btn" htmlFor="Nav_Menu">
            <input type="checkbox" id="Nav_Menu"/>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        {/* <ul className="Nav_List">
          <li className="Nav_Dropdown">
            <button className="Nav_Dropdown_Button" onClick={toggleDropdown}>
              제품
            </button>
          </li>
          <li>
            <Link to="/items-top-list/all">추천 리스트</Link>
          </li>
        </ul> */}
        <div className="Header_Logo">
          <Link to="/">L'acier</Link>
        </div>
        <div className="Header_Icons">
          {memberId === null ? (
            <Link to="/login">
              <UserIcon name="Header_Icon" />
            </Link>
          ) : (
            <Link to={`/memberPage/${memberId}`}>
              <UserIcon name="Header_Icon" />
            </Link>
          )}
          <Link to={`/members/${memberId}/carts`}>
            <CartIcon name="Header_Icon" />
          </Link>
          <div onClick={userLogOut}>
            <LogoutIcon name="Header_Icon" />
          </div>
        </div>
      </nav>
      <div className="Nav_Dropdown_Box">
        {isDropdownClicked ? (
          <div className="Nav_Dropdown_Content">
            <Link to="/items-list/all" onClick={toggleDropdown}>
              All
            </Link>
            <Link to="/items-list/toner" onClick={toggleDropdown}>
              스킨/토너
            </Link>
            <Link to="/items-list/cream" onClick={toggleDropdown}>
              크림
            </Link>
            <Link to="/items-list/lotion" onClick={toggleDropdown}>
              로션
            </Link>
            <Link to="/items-list/cleansing" onClick={toggleDropdown}>
              클렌징
            </Link>
            <Link to="/items-list/suncream" onClick={toggleDropdown}>
              선크림
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
