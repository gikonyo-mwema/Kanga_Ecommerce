import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isSuccess: false, // Added for registration success tracking
};

// Async action to handle login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await authService.login(userData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async action to handle registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isSuccess = false; // Reset on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true; // Set success flag on successful registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

