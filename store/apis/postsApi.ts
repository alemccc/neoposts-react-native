import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { camelizeKeys } from 'humps';

import { GetPostsRequest, GetPostsResponse } from '@/constants/types';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsResponse, GetPostsRequest>({
      query: ({ page = 1, perPage = 25, userId = null }) => ({
        url: `/posts?page=${page}&per_page=${perPage}${userId ? `&user_id=${userId}` : ''}`,
        method: 'GET',
      }),
      transformResponse: (response: GetPostsResponse) =>
        camelizeKeys(response) as GetPostsResponse,
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
