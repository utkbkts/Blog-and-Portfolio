import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/contact`,
    credentials: "include",
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    contactSend: builder.mutation({
      query(body) {
        return {
          url: `/send`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useContactSendMutation } = contactApi;
