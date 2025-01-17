import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/posts`,
    tagTypes: ["Post", "Review"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (params) => {
        return {
          url: "/",
          params: {
            page: params?.page,
            search: params?.search,
            category: params?.category,
          },
        };
      },
      providesTags: ["Post"],
    }),
    postGetCategoryAll: builder.query({
      query: () => `/categories`,
      providesTags: ["Post"],
    }),
    postById: builder.query({
      query: ({ title, postId }) => `/details/${title}/${postId}`,
      providesTags: ["Post"],
    }),

    submitReview: builder.mutation({
      query({ body, title, postId }) {
        return {
          url: `/newComment/${title}/${postId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Post", "Review"],
    }),
    getUserReviews: builder.query({
      query: ({ title, id }) => `/${title}/${id}`,
      providesTags: ["Post", "Review"],
    }),
    deleteReview: builder.mutation({
      query(commentId) {
        return {
          url: `/${commentId}`,
          method: "DELETE",
        };
      },
    }),
    updateReview: builder.mutation({
      query(commentId) {
        return {
          url: `/${commentId}`,
          method: "PUT",
        };
      },
    }),
    createPost: builder.mutation({
      query(body) {
        return {
          url: `/create`,
          method: "POST",
          body,
        };
      },
    }),
    updatePost: builder.mutation({
      query({ body, postId }) {
        return {
          url: `/${postId}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  usePostByIdQuery,
  useSubmitReviewMutation,
  useGetUserReviewsQuery,
  usePostGetCategoryAllQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postApi;
