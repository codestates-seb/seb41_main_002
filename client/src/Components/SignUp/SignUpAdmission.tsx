import { signUp } from "../../API/SignUp";
import { Dispatch, SetStateAction } from "react";
import "../Style/signUp.css";
import { useNavigate } from "react-router-dom";

interface MemberType {
  accountID: string;
  password: string;
  memberName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}

const SignUpAdmission = ({
  Member,
  setSignUpModalState,
}: {
  Member: MemberType;
  setSignUpModalState: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const memberSignUp = () => {
    signUp(Member).then((res) => {
      setSignUpModalState(false);
      navigate('/');
    });
  };

  return (
    <div>
      <h2>회원가입 하시겠습니까?</h2>
      <div className="Select_Button">
        <button onClick={memberSignUp}>확인</button>
        <button onClick={() => setSignUpModalState(false)}>취소</button>
      </div>
    </div>
  );
};

export default SignUpAdmission;
