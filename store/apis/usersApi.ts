import { camelizeKeys } from 'humps';

import type { GetMyProfileResponse } from '@/constants/types';

import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<GetMyProfileResponse, void>({
      providesTags: ['MyProfile'],
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      transformResponse: (response: GetMyProfileResponse) =>
        camelizeKeys(response) as GetMyProfileResponse,
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyProfileQuery } = usersApi;
