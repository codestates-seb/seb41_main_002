import { Link } from "react-router-dom";
import "../../Pages/Style/memberAccess.css";

const AccessMenu = () => {
  return (
    <ul className="Member_Access_Menu">
        <li>
          <Link to={"/signUp"}>회원가입</Link>
        </li>
        <li>
          <Link to={"/login"}>로그인</Link>
        </li>
        <li>
          <Link to={"/findId"}>아이디 찾기</Link>
        </li>
        <li>
          <Link to={"/findPw"}>비밀번호 찾기</Link>
        </li>
      </ul>
  )
}

export default AccessMenu