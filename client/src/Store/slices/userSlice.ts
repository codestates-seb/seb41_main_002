import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultInstance } from "../../API/Core";

import jwtDecode from "jwt-decode";

export interface MemberInputType {
  accountId: string;
  password: string;
}

interface UserType {
  accountId: string;
  memberId: number;
  password: string;
  accessToken: string;
  refreshToken: string;
  userLogin: number;
}

export interface decodeType {
  accountId: string;
  exp: number;
  iat: number;
  memberId: number;
  roles: string[];
  sub: string;
}

//로그인 기능
const asyncLogin = createAsyncThunk(
  "userSlice/asyncLogin",
  async (MemberInput: MemberInputType) => {
    const login = await defaultInstance.post(
      "/login",
      JSON.stringify(MemberInput)
    );
    return login.data;
  }
);

// 토큰 재발급
const asyncSilentRefresh = createAsyncThunk(
  "userSlice/asyncSilentRefresh",
  async (refreshToken: string) => {
    const tokenChange = await axios.get(
      "http://13.125.242.34:8080/api/v1/user/refresh-token",
      {
        headers: {
          Refresh: refreshToken,
        },
      }
    );
    return tokenChange.data;
  }
);

const initialState: UserType = {
  accountId: "",
  memberId: 0,
  password: "",
  accessToken: "",
  refreshToken: "",
  userLogin: 0,
};

const userSlice = createSlice({
  name: "userController",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userLogin = 1;

      const decode: decodeType = jwtDecode(state.accessToken);
      state.memberId = decode.memberId;

      sessionStorage.setItem("memberId", String(decode.memberId));
      sessionStorage.setItem("accessToken", action.payload.accessToken);
      sessionStorage.setItem("refreshToken", action.payload.refreshToken);
    });

    builder.addCase(asyncLogin.rejected, (state) => {
      state.userLogin = 2;
    });
  },
});

export default userSlice.reducer;
export { asyncLogin, asyncSilentRefresh };
