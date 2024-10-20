import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const initialState = {
  user: null,
  loading: false,
  error: null,
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
    const response = await authService.register(userData); // Ensure you have a register function in authService
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
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful registration if needed
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle registration error
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
