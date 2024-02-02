import {createSlice} from "@reduxjs/toolkit";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/actions/productActions";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  published: boolean;
}

interface Products {
  products: {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: Product[];
  };
  actionStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: Products = {
  products: {
    status: "idle",
    data: [],
  },
  actionStatus: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.products.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products.status = "succeeded";
        state.products.data = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.products.status = "failed";
      })

      .addCase(addProduct.pending, (state, action) => {
        state.actionStatus = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.products.data = [...state.products.data, action.payload];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.actionStatus = "failed";
      })

      .addCase(deleteProduct.pending, (state, action) => {
        state.actionStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.products.data = [...state.products.data].filter(
          (item) => item.id != action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.actionStatus = "failed";
      })

      .addCase(updateProduct.pending, (state, action) => {
        state.actionStatus = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.products.data = state.products.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.actionStatus = "failed";
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
