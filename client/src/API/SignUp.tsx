import axios from "axios";

export interface MemberType {
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
    ).then((res) => {
      return res;
    })
    return response
  } catch (error) {
    console.error(error)
  }
};

//회원가입
export const signUp = async (memberData: MemberType) => {
  try {
    let dateChange = memberData.birthDate.replace(/\-/gi, "/");
    const setMemberData = {
      ...memberData,
      birthDate: dateChange,
    };
    await axios.post("http://localhost:8080/api/v1/signup", setMemberData);
  } catch (error) {
    console.error(error);
  }
};
