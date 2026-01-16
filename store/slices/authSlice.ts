import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SignUpResponse } from '@/constants/types';

interface AuthState {
  userName: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userName: null,
  email: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<SignUpResponse>,
    ) => {
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.userName = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
} = authSlice.actions;

export default authSlice.reducer;
