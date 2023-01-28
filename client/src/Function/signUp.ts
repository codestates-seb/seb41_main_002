import { Dispatch, SetStateAction } from "react";
import { doubleCheck } from "../API/SignUp";
import { MemberType } from "../API/SignUp";

export const onEmailRegex = (email: string) => {
  //이메일 정규식
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(email);
};

export const onInputNullCheck = (
  Member: MemberType,
  setMessage: Dispatch<SetStateAction<string>>,
  setModalState: Dispatch<SetStateAction<boolean>>
) => {
  const MemberKeyKor = [
    "전화번호",
    "이메일",
    "생년월일",
    "이름",
    "비밀번호",
    "아이디",
  ];
  const MemberValue: string[] = Object.values(Member).reverse();
  let result = true;
  MemberValue.forEach((value, index) => {
    if (value === "") {
      setMessage(MemberKeyKor[index] + "을(를) 입력해주세요.");
      setModalState(true);
      result = false;
    }
  });
  return result;
};

export const onPasswordConfirm = (
  password: string,
  passwordCheck: string,
  setMessage: Dispatch<SetStateAction<string>>,
  setModalState: Dispatch<SetStateAction<boolean>>
) => {
  if (password !== passwordCheck) {
    setMessage("비밀번호가 다릅니다.");
    setModalState(true);
    return false;
  }
  return true;
};

export const onIdDoubleCheck = async (
  Member: MemberType,
  setMessage: Dispatch<SetStateAction<string>>,
  setModalState: Dispatch<SetStateAction<boolean>>
) => {
  let result = false;
  if (Member.accountId === "") {
    setMessage("아이디를 입력하세요.");
    setModalState(true);
  } else {
    await doubleCheck(Member.accountId).then((res) => {
      if (res) {
        setMessage("사용 가능한 아이디입니다.");
        setModalState(true);
        result = true;
      } else {
        setMessage("아이디가 중복입니다.");
        setModalState(true);
      }
    });
  }
  return result;
};
