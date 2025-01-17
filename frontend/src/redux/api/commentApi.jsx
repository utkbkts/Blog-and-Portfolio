import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/comments`,
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    submitReview: builder.mutation({
      query({ comment, title, postId }) {
        return {
          url: `/newComment/${title}/${postId}`,
          method: "POST",
          body: { comment },
        };
      },
      invalidatesTags: ["Comments"],
    }),
    getUserReviews: builder.query({
      query: ({ title, id }) => `/${title}/${id}`,
      providesTags: ["Comments"],
    }),
    deleteReview: builder.mutation({
      query({ commentId }) {
        return {
          url: `/delete/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Comments"],
    }),
    updateReview: builder.mutation({
      query({ comment, commentId }) {
        return {
          url: `/${commentId}`,
          method: "PUT",
          body: { comment },
        };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetUserReviewsQuery,
  useSubmitReviewMutation,
} = commentApi;
