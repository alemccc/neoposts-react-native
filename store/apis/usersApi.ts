import { camelizeKeys } from 'humps';

import type {
  GetUsersRequest,
  GetUsersResponse,
  GetUserProfileRequest,
  UserData,
  FollowUnfollowUserRequest,
  FollowUnfollowUserResponse,
 } from '@/constants/types';

import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<UserData, void>({
      providesTags: ['MyProfile', 'Post'],
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      transformResponse: (response: UserData) =>
        camelizeKeys(response) as UserData,
    }),
    getUserProfile: builder.query<UserData, GetUserProfileRequest>({
      providesTags: (_result, _error, arg) => [{ type: 'Profile', id: arg.userId }, 'Post'],
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: UserData) =>
        camelizeKeys(response) as UserData,
    }),
    followUser: builder.mutation<FollowUnfollowUserResponse, FollowUnfollowUserRequest>({
      invalidatesTags: (_result, _error, arg) => [{
        type: 'Profile',
        id: arg.userId,
      }, 'MyProfile'],
      query: ({ userId }) => ({
        url: `/users/${userId}/follow`,
        method: 'POST',
      }),
      transformResponse: (response: FollowUnfollowUserResponse) =>
        camelizeKeys(response) as FollowUnfollowUserResponse,
    }),
    unfollowUser: builder.mutation<FollowUnfollowUserResponse, FollowUnfollowUserRequest>({
      invalidatesTags: (_result, _error, arg) => [{
        type: 'Profile',
        id: arg.userId,
      }, 'MyProfile'],
      query: ({ userId }) => ({
        url: `/users/${userId}/follow`,
        method: 'DELETE',
      }),
      transformResponse: (response: FollowUnfollowUserResponse) =>
        camelizeKeys(response) as FollowUnfollowUserResponse,
    }),
    getUsers: builder.infiniteQuery<GetUsersResponse, GetUsersRequest, number>({
      query: ({ pageParam = 1, queryArg }) => ({
        url: '/users',
        method: 'GET',
        params: {
          page: pageParam,
          per_page: queryArg?.perPage ?? 25,
          ...({ search: encodeURIComponent(queryArg.search || '') }),
        },
      }),
      transformResponse: (response: GetUsersResponse) =>
        camelizeKeys(response) as GetUsersResponse,

      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage: GetUsersResponse) => lastPage.pagination?.nextPage,
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyProfileQuery,
  useGetUserProfileQuery,
  useGetUsersInfiniteQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
 } = usersApi;
