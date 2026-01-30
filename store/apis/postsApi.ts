import { camelizeKeys, decamelizeKeys } from 'humps';

import { addNewPostToTop } from '@/utils/apiHelpers';

import {
  GetPostsRequest,
  GetPostsResponse,
  CreatePostRequest,
  CreatePostResponse,
  LikePostRequest,
  LikePostResponse,
  CommentPostRequest,
  CommentPostResponse,
  GetPostRequest,
  PostData,
} from '@/constants/types';

import { api } from './api';

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.infiniteQuery<GetPostsResponse, GetPostsRequest, number>({
      providesTags: (result) =>
        result ?
        [...result.pages.flatMap(
          (page) => page.posts.map((post) => (
            { type: 'Post' as const, id: post.id }))),
            { type: 'Post', id: 'LIST' }]
          : [{ type: 'Post', id: 'LIST' }],
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
    likePost: builder.mutation<LikePostResponse, LikePostRequest>({
      invalidatesTags: (_result, _error, arg) => [{
        type: 'Post',
        id: arg.postId,
      }, 'Post'],
      query: ({ postId }) => ({
        url: `/posts/${postId}/like`,
        method: 'POST',
      }),
      transformResponse: (response: LikePostResponse) =>
        camelizeKeys(response) as LikePostResponse,
    }),
    unlikePost: builder.mutation<LikePostResponse, LikePostRequest>({
      invalidatesTags: (_result, _error, arg) => [{
        type: 'Post',
        id: arg.postId,
      }, 'Post'],
      query: ({ postId }) => ({
        url: `/posts/${postId}/like`,
        method: 'DELETE',
      }),
      transformResponse: (response: LikePostResponse) =>
        camelizeKeys(response) as LikePostResponse,
    }),
    checkIfPostIsLiked: builder.query<LikePostResponse, LikePostRequest>({
      providesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.postId }],
      query: ({ postId }) => ({
        url: `/posts/${postId}/liked`,
        method: 'GET',
      }),
      transformResponse: (response: LikePostResponse) =>
        camelizeKeys(response) as LikePostResponse,
    }),
    getPost: builder.query<PostData, GetPostRequest>({
      providesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.postId }],
      query: ({ postId }) => ({
        url: `/posts/${postId}`,
        method: 'GET',
      }),
      transformResponse: (response: PostData) =>
        camelizeKeys(response) as PostData,
    }),
    commentPost: builder.mutation<CommentPostResponse, CommentPostRequest>({
      invalidatesTags: ['Post'],
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: decamelizeKeys({ body }),
      }),
      transformResponse: (response: CommentPostResponse) =>
        camelizeKeys(response) as CommentPostResponse,
    }),
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      invalidatesTags: ['MyProfile'],
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

export const {
  useGetPostsInfiniteQuery,
  useCreatePostMutation,
  useCheckIfPostIsLikedQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentPostMutation,
  useGetPostQuery,
} = postsApi;
