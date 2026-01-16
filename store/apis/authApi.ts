import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { camelizeKeys, decamelizeKeys } from 'humps';

import {
  SignUpRequest,
  SignUpResponse
} from '@/constants/types';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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
      transformResponse: (response: SignUpResponse) => camelizeKeys(response) as SignUpResponse,
    }),
  }),
});

export const { useSignUpMutation } = authApi;
