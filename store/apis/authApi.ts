import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { camelizeKeys, decamelizeKeys } from 'humps';
import SecureStorage from 'react-native-fast-secure-storage';

import {
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
} from '@/constants/types';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const AUTH_TOKEN_KEY = 'access-token';
export const UID_KEY = 'uid';
export const CLIENT_KEY = 'client';

const saveAuthHeaders = async (headers: Headers) => {
  const accessToken = headers.get(AUTH_TOKEN_KEY);
  const uid = headers.get(UID_KEY);
  const client = headers.get(CLIENT_KEY);

  if (accessToken && uid && client) {
    await SecureStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    await SecureStorage.setItem(UID_KEY, uid);
    await SecureStorage.setItem(CLIENT_KEY, client);
  }
};

const onAuthQueryStarted = async (
  _: unknown,
  {
    queryFulfilled,
  }: {
    queryFulfilled: Promise<{
      meta?: {
        response?: {
          headers?: Headers;
        };
      };
    }>;
  },
) => {
  try {
    const { meta } = await queryFulfilled;
    const headers = meta?.response?.headers;

    if (headers) {
      await saveAuthHeaders(headers);
    }
  } catch {
    console.warn('Failed to save auth headers');
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: decamelizeKeys(credentials),
      }),
      transformResponse: (response: SignUpResponse) =>
        camelizeKeys(response) as SignUpResponse,
      onQueryStarted: onAuthQueryStarted,
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/users/sign_in',
        method: 'POST',
        body: decamelizeKeys(credentials),
      }),
      transformResponse: (response: SignInResponse) =>
        camelizeKeys(response) as SignInResponse,
      onQueryStarted: onAuthQueryStarted,
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
