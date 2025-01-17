import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setisAuthenticated,
  setUser,
  setLoading,
} from "../features/user-slice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/user`,
    credentials: "include",
  }),
  tagTypes: ["User", "AdminUser"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/me",
      transformResponse: (response) => response.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setisAuthenticated(true));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User", "AdminUser"],
    }),
    likedPost: builder.mutation({
      query({ postId }) {
        return {
          url: `/${postId}`,
          method: "PUT",
        };
      },
    }),
  }),
});

export const { useLikedPostMutation, useGetUserQuery } = userApi;
