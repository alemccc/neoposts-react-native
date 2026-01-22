import { camelizeKeys } from 'humps';

import { GetPostsRequest, GetPostsResponse } from '@/constants/types';

import { api } from './api';

export const postsApi = api.injectEndpoints({
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
  overrideExisting: false,
});

export const { useGetPostsInfiniteQuery } = postsApi;
