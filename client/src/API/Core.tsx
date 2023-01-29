import axios from "axios";
import jwtDecode from "jwt-decode";
import { decodeType } from "../Store/slices/userSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
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
        .get(`${BASE_URL}/user/refresh-token`, {
          headers: {
            Refresh: refreshToken,
          },
        })
        .then((res: any) => {
          sessionStorage.setItem("accessToken", res.data.accessToken);
          sessionStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log("교체 실패");
          console.log(err);
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
    headers: { Authorization: accessToken },
  });

  instance.interceptors.request.use(function (config) {
    changeToken();
    return config;
  });

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
