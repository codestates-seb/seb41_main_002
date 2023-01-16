import axios from "axios";

interface MemberType {
  accountID: string;
  password: string;
  memberName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}

//중복체크
export const doubleCheck = async (accountID: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/idcheck/${accountID}`
    ).then(() => {
      //중복이 아님
      return true;
    })
    return response
  } catch (error) {
    //중복임
    return false;
  }
};

//회원가입
export const signUp = async (memberData: MemberType) => {
  try {
    let dateChange = memberData.birthDate.replace(/\-/gi, "/");
    console.log(dateChange);
    const setMemberData = {
      ...memberData,
      birthDate: dateChange,
    };
    await axios.post("http://localhost:8080/api/v1/signup", setMemberData);
  } catch (error) {
    console.error(error);
  }
};
