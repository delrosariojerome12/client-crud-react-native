import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_BASE_URL} from "@env";

export const handleLogin = createAsyncThunk("service/auth", async () => {
  try {
    const url = `${API_BASE_URL}/login`;
    const response = await axios.post(url);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
