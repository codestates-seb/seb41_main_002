import axios from "axios";

interface MemberInputType {
  accountId: string;
  password: string;
}

const JWT_EXPIRY_TIME = 1200 * 1000;

export const onLogin = async (MemberInput: MemberInputType) => {
  try {
    await axios
      .post("http://13.209.97.3:8080/api/v1/login", JSON.stringify(MemberInput))
      .then((res) => {
        onLoginSuccess(res.data);
      });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const onSilentRefresh = (refreshToken: string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `${refreshToken}`;
    axios
      .get("http://13.209.97.3:8080/api/v1/user/access-token")
      .then((res) => {
        onLoginSuccess(res.data);
      });
  } catch (err) {
    console.error(err);
  }
};

const onLoginSuccess = (response: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    const { accessToken, refreshToken } = response;
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    sessionStorage.setItem("accessToken", accessToken);
    setTimeout(() => onSilentRefresh(refreshToken), JWT_EXPIRY_TIME - 60000);
  } catch (err) {
    console.error(err);
  }
};
