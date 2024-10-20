import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Async action to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await productService.getAllProducts();
    return response; // Ensure this is an array
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Ensure this is an array
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
