import {createSlice} from "@reduxjs/toolkit";

interface AuthUser {
  user: {
    username: string;
    password: string;
    status: "logged-in" | "logged-out";
  };
}
const initialState: AuthUser = {
  user: {
    username: "",
    password: "",
    status: "logged-out",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.user.status = "logged-out";
      state.user.username = "";
    },
  },
  extraReducers(builder) {},
});

export const {handleLogout} = authSlice.actions;

export default authSlice.reducer;
