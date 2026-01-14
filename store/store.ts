import { configureStore, createSlice } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    placeholder: createSlice({
      name: 'placeholder',
      initialState: {},
      reducers: {},
    }).reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
