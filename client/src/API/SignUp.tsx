import { defaultInstance } from "./Core";

export interface MemberType {
  accountId: string;
  password: string;
  memberName: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}

interface MemberInfo{
  accountId: string;
  password: string;
}

//중복체크
export const doubleCheck = async (accountID: string) => {
  try {
    const response = await defaultInstance
      .get(`/idcheck/${accountID}`)
      .then((res) => {
        return res;
      });
    return response;
  } catch (error) {
    console.error(error);
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
    console.log(setMemberData);
    let reponse = await defaultInstance.post(`/signup`, setMemberData).then((res) => {
      const memberInfo:MemberInfo = {
        accountId: memberData.accountId,
        password: memberData.password,
      };
      return memberInfo;
    });
    return reponse;
  } catch (error) {
    console.error(error);
  }
};
