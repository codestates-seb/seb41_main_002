import axios from "axios";

export interface MemberType {
  accountID: string;
  password: string;
  memberName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL

//중복체크
export const doubleCheck = async (accountID: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/idcheck/${accountID}`
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
    await axios.post(`${BASE_URL}/signup`, setMemberData);
  } catch (error) {
    console.error(error);
  }
};
