import { camelizeKeys, decamelizeKeys } from 'humps';

import { addNewPostToTop } from '@/utils/apiHelpers';

import {
  GetPostsRequest,
  GetPostsResponse,
  CreatePostRequest,
  CreatePostResponse,
} from '@/constants/types';

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
      serializeQueryArgs: ({ endpointName }) => endpointName,

      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage: GetPostsResponse) => lastPage.pagination?.nextPage,
      },
    }),
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      invalidatesTags: ['Profile'],
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body: decamelizeKeys(body),
      }),
      transformResponse: (response: CreatePostResponse) =>
        camelizeKeys(response) as CreatePostResponse,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        addNewPostToTop(dispatch, postsApi.util.updateQueryData, data);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsInfiniteQuery, useCreatePostMutation } = postsApi;
