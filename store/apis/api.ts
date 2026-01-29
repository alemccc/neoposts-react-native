import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setItemAsync, getItemAsync } from 'expo-secure-store';
import { camelizeKeys, decamelizeKeys } from 'humps';

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
export const USER_ID_KEY = 'user-id';

const saveAuthHeaders = async (headers: Headers) => {
  const accessToken = headers.get(AUTH_TOKEN_KEY);
  const uid = headers.get(UID_KEY);
  const client = headers.get(CLIENT_KEY);

  if (accessToken && uid && client) {
    Promise.all([
      setItemAsync(AUTH_TOKEN_KEY, accessToken),
      setItemAsync(UID_KEY, uid),
      setItemAsync(CLIENT_KEY, client),
    ]);
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

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { endpoint }) => {
      if (endpoint !== 'signUp' && endpoint !== 'signIn') {
        const accessToken = await getItemAsync(AUTH_TOKEN_KEY);
        const uid = await getItemAsync(UID_KEY);
        const client = await getItemAsync(CLIENT_KEY);

        if (accessToken) {
          headers.set(AUTH_TOKEN_KEY, accessToken);
        }
        if (uid) {
          headers.set(UID_KEY, uid);
        }
        if (client) {
          headers.set(CLIENT_KEY, client);
        }
      }

      return headers;
    },
  }),
  tagTypes: ['Profile', 'MyProfile', 'Post'],
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
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: '/users/sign_out',
        method: 'DELETE',
        headers: {
          'Custom-Header': 'some-valu',
          'Another-Header': 'another-value',
        },
      }),
      transformResponse: (response: void) => camelizeKeys(response) as void,
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } = api;
