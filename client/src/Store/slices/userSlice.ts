import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface MemberInputType {
  accountId: string;
  password: string;
}

interface UserType {
  accountId: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  userLogin: number;
}

const asyncLogin = createAsyncThunk(
  "userSlice/asyncLogin",
  async (MemberInput: MemberInputType) => {
    const login = await axios.post(
      "http://13.209.97.3:8080/api/v1/login",
      JSON.stringify(MemberInput)
    );
    return login.data;
  }
);

const asyncSilentRefresh = createAsyncThunk(
  "userSlice/asyncSilentRefresh",
  async (refreshToken: string) => {
    const tokenChange = await axios.get(
      "http://13.209.97.3:8080/api/v1/user/refresh-token",
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
  password: "",
  accessToken: "",
  refreshToken: "",
  userLogin: 0,
};

const userSlice = createSlice({
  name: "userController",
  initialState,
  reducers: {
    login: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      console.log(state.refreshToken);
      state.userLogin = 1;
      setTimeout(() => asyncSilentRefresh(state.refreshToken), 1140000);
    });

    builder.addCase(asyncLogin.rejected, (state) => {
      state.userLogin = 2;
    });

    builder.addCase(asyncSilentRefresh.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      setTimeout(() => asyncSilentRefresh(state.refreshToken), 1140000);
    });
  },
});

export default userSlice.reducer;
// export const { setToken } = userSlice.actions;
export { asyncLogin, asyncSilentRefresh };
