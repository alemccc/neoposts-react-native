import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItemAsync, setItemAsync } from 'expo-secure-store';

import { UserData } from '@/constants/types';

import {
  AUTH_TOKEN_KEY,
  CLIENT_KEY,
  UID_KEY,
  USER_ID_KEY,
} from '@/store/apis/api';

interface AuthState {
  userId: number | null;
  userName: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  email: null,
  isAuthenticated: false,
  isLoading: true,
};

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { dispatch }) => {
    try {
      const accessToken = await getItemAsync(AUTH_TOKEN_KEY);
      const uid = await getItemAsync(UID_KEY);
      const client = await getItemAsync(CLIENT_KEY);
      const userId = await getItemAsync(USER_ID_KEY);

      const isAuthenticated = !!(accessToken && uid && client);

      if (isAuthenticated && userId) {
        dispatch(setCredentials({ id: Number(userId) }));
      } else {
        dispatch(clearCredentials());
      }
    } catch {
      dispatch(clearCredentials());
    }
  },
);

export const saveSession = createAsyncThunk(
  'auth/saveSession',
  async (
    data: UserData,
    { dispatch },
  ) => {
    await setItemAsync(USER_ID_KEY, data.id.toString());

    dispatch(setCredentials(data));
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ id: number }>,
    ) => {
      state.userId = action.payload.id;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearCredentials: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
} = authSlice.actions;

export default authSlice.reducer;
