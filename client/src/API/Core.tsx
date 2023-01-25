import axios from "axios";
import jwtDecode from "jwt-decode";
import { decodeType } from "../Store/slices/userSlice";

const BASE_URL = "http://13.125.242.34:8080/api/v1";
const accessToken = sessionStorage.getItem("accessToken");
const refreshToken = sessionStorage.getItem("refreshToken");

const changeToken = () => {
  const decodeToken: decodeType | null | "" =
    accessToken && jwtDecode(accessToken);
  const tokenExp = decodeToken && decodeToken.exp;
  let now = Math.floor(new Date().getTime() / 1000);

  if (tokenExp) {
    if (now > tokenExp) {
      axios
        .get("http://13.125.242.34/api/v1/user/refresh-token", {
          headers: {
            Refresh: refreshToken,
          },
        })
        .then((res:any) => {
          console.log(res);
          console.log('토큰 교체');
          sessionStorage.setItem("accessToken", res.accessToken);
          sessionStorage.setItem("refreshToken", res.refreshToken);
        });
    }
  }
};

const axiosApi = (url: string) => {
  const instance = axios.create({ baseURL: url });
  instance.interceptors.request.use(function (config) {
    changeToken();
    return config;
  });

  return instance;
};

const axiosAuthApi = (url: string) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: "Bearer " + accessToken },
  });

  instance.interceptors.request.use(function (config) {
    changeToken();
    return config;
  });

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
