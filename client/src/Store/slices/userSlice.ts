import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  isSubscribed: boolean,
  subscribedDate: string
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

const initialState: UserType = {
  accountId: "",
  memberId: 0,
  password: "",
  accessToken: "",
  refreshToken: "",
  userLogin: 0,
  isSubscribed: false,
  subscribedDate: ""
};

const userSlice = createSlice({
  name: "userController",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      console.log(state);
      console.log(action);
      state.accessToken = action.payload.tokenInfo.accessToken;
      state.refreshToken = action.payload.tokenInfo.refreshToken;
      state.isSubscribed = action.payload.isSubscribed;
      state.subscribedDate = action.payload.subscribedDate;
      state.userLogin = 1;

      const decode: decodeType = jwtDecode(state.accessToken);
      state.memberId = decode.memberId;
      sessionStorage.setItem("regularPayment", action.payload.subscribedDate);
      sessionStorage.setItem("isSubscribed", action.payload.isSubscribed);
      sessionStorage.setItem("memberId", String(decode.memberId));
      sessionStorage.setItem("accessToken", action.payload.tokenInfo.accessToken);
      sessionStorage.setItem("refreshToken", action.payload.tokenInfo.refreshToken);
    });

    builder.addCase(asyncLogin.rejected, (state) => {
      state.userLogin = 2;
    });
  },
});

export default userSlice.reducer;
export { asyncLogin };
