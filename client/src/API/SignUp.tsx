import axios from "axios";
import { defaultInstance } from "./Core";

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
    const response = await defaultInstance.get(
      `/idcheck/${accountID}`
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
    await defaultInstance.post(`/signup`, setMemberData);
  } catch (error) {
    console.error(error);
  }
};
