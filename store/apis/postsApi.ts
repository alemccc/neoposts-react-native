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
    getPosts: builder.infiniteQuery<GetPostsResponse, GetPostsRequest, number>({
      query: ({ pageParam = 1, queryArg }) => ({
        url: '/posts',
        method: 'GET',
        params: {
          page: pageParam,
          per_page: queryArg?.perPage ?? 25,
          ...(queryArg?.userId ? { user_id: queryArg.userId } : {}),
        },
      }),
      transformResponse: (response: GetPostsResponse) =>
        camelizeKeys(response) as GetPostsResponse,
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage: GetPostsResponse) => lastPage.pagination?.nextPage,
      },
    }),
  }),
});

export const { useGetPostsInfiniteQuery } = postsApi;
