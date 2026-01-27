import { camelizeKeys } from 'humps';

import type {
  GetMyProfileResponse,
  GetUsersRequest,
  GetUsersResponse,
  GetUserProfileRequest,
  UserData,
 } from '@/constants/types';

import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<GetMyProfileResponse, void>({
      providesTags: ['Profile'],
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      transformResponse: (response: GetMyProfileResponse) =>
        camelizeKeys(response) as GetMyProfileResponse,
    }),
    getUserProfile: builder.query<UserData, GetUserProfileRequest>({
      providesTags: ['Profile'],
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: UserData) =>
        camelizeKeys(response) as UserData,
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
 } = usersApi;
