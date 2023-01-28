import { defaultInstance } from "./Core";

export const findId = async (email: string) => {
  try {
    const response = await defaultInstance
      .post(`/accountid`, { email: email })
      .then((res) => {
        return res;
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};

interface UserInfo {
  accountId: string;
  email: string;
}

export const findPw = async (userInfo: UserInfo) => {
  try {
    console.log(userInfo);
    const response = await defaultInstance
      .post(`/password`, {
        accountId: userInfo.accountId,
        email: userInfo.email,
      })
      .then((res) => {
        console.log("분명 보냄");
        return res;
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};
