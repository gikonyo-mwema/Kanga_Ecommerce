import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

// Async actions for products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await productService.getAllProducts();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData, thunkAPI) => {
  try {
    const response = await productService.createProduct(productData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ productId, productData }, thunkAPI) => {
  try {
    const response = await productService.updateProduct(productId, productData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId, thunkAPI) => {
  try {
    const response = await productService.deleteProduct(productId);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched Products Payload:", action.payload); // Debugging the payload
        state.products = action.payload; // Ensure this is an array
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload._id);
      });
  },
});

export default productSlice.reducer;


