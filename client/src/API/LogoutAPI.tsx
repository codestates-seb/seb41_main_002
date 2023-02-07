import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
const accessToken = sessionStorage.getItem("accessToken");
const refreshToken = sessionStorage.getItem("refreshToken");

export const onLogout = async () => {
  const config = {
    method: "post",
    url: `${BASE_URL}/logout`,
    headers: {
      Authorization: accessToken,
      Refresh: refreshToken,
    },
  };
  try {
    await axios(config)
      .then(() => sessionStorage.clear())
      .catch((err) => console.log(err));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
