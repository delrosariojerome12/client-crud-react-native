import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_BASE_URL} from "../../constants";

export const getAllProducts = createAsyncThunk(
  "service/getAllProducts",
  async () => {
    try {
      const url = `${API_BASE_URL}/products/getAll`;
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "service/addProduct",
  async (productData: any, {rejectWithValue}) => {
    console.log("xxx", productData);

    try {
      const url = `${API_BASE_URL}/products/addProduct`; // Assuming there's an endpoint for adding a product
      const response = await axios.post(url, productData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message || "Failed to add product");
    }
  }
);
export const updateProduct = createAsyncThunk(
  "service/updateProduct",
  async (updateData: any, {rejectWithValue}) => {
    try {
      const url = `${API_BASE_URL}/products/updateOne/${updateData.id}`;
      const response = await axios.put(url, updateData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to add product");
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "service/deleteProduct",
  async (id: any, {rejectWithValue}) => {
    try {
      const url = `${API_BASE_URL}/products/deleteOne/${id}`;
      const response = await axios.delete(url);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to add product");
    }
  }
);
