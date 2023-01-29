import { defaultInstance } from "./Core";

export const findId = async (email: string) => {
  try {
    const response = await defaultInstance
      .post(`/accountid`, { email: email })
      .then(() => {
        return true;
      });
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};

interface UserInfo {
  accountId: string;
  email: string;
}

export const findPw = async (userInfo: UserInfo) => {
  try {
    const response = await defaultInstance
      .post(`/password`, {
        accountId: userInfo.accountId,
        email: userInfo.email,
      })
      .then(() => {
        return true;
      });
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};
