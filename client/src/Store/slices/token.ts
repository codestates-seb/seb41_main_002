import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface TokenType {
  accessToken : string
  refreshToken: string
}

const initialState: TokenType = {
  accessToken: "",
  refreshToken: ""
};

const tokenSlice = createSlice({
  name: "tokenController",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.refreshToken = action.payload;
    },
    getAccessToken: (state) => {
      
    }
  }
});

export default tokenSlice.reducer;