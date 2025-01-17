import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user-slice";
import { userApi } from "../api/userApi";
import { authApi } from "../api/authApi";
import { postApi } from "../api/postApi";
import { contactApi } from "../api/contactApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      postApi.middleware,
      contactApi.middleware
    ),
});
