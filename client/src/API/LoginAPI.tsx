import axios from "axios";
import jwt_decode from "jwt-decode";

interface MemberInputType {
  accountId: string;
  password: string;
}

interface AccessTokenType {
  accountId: string;
  exp: number;
  iat: number;
  memberId: number;
  roles: string[];
  sub: string;
}

axios.interceptors.request.use(function (config) {
  const today = Math.floor(new Date().getTime() / 1000);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const decodeToken = accessToken && jwt_decode(accessToken) as AccessTokenType;
  const expDate = decodeToken && decodeToken.exp;
  if(expDate){
    if(expDate < today){
      console.log('토큰 유효기간이 지났어');
      axios.post("http://13.209.97.3:8080/api/v1/user/refresh-token",null,{
        headers: {
          "Refresh": refreshToken
        }
      }).then(res => {
        const accessToken = res.data;
        localStorage.setItem("accessToken", accessToken);
      })
    } else {
      console.log('시간 널널해');
    }
  }
  return config;
});

export const logIn = async (MemberInput: MemberInputType) => {
  try {
    await axios
      .post("http://13.209.97.3:8080/api/v1/login", JSON.stringify(MemberInput))
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      });
  } catch (err) {
    console.error(err);
  }
};