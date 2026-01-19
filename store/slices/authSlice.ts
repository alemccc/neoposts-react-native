import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import SecureStorage from 'react-native-fast-secure-storage';

import { AUTH_TOKEN_KEY, CLIENT_KEY, UID_KEY } from '@/store/apis/authApi';

interface AuthState {
  userName: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  userName: null,
  email: null,
  isAuthenticated: false,
  isLoading: true,
};

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { dispatch }) => {
    try {
      const accessToken = await SecureStorage.getItem(AUTH_TOKEN_KEY);
      const uid = await SecureStorage.getItem(UID_KEY);
      const client = await SecureStorage.getItem(CLIENT_KEY);

      const isAuthenticated = !!(accessToken && uid && client);
      dispatch(setAuthStatus(isAuthenticated));
    } catch {
      dispatch(clearCredentials());
      dispatch(setAuthStatus(false));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ name: string; email: string }>,
    ) => {
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearCredentials: (state) => {
      state.userName = null;
      state.email = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, clearCredentials, setAuthStatus } =
  authSlice.actions;

export default authSlice.reducer;
