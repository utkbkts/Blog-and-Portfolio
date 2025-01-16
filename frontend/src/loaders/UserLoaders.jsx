/* eslint-disable no-unused-vars */
import { redirect } from "react-router-dom";
import { store } from "../redux/store/store";
import { userApi } from "../redux/api/userApi";
export const UserLoaders = async () => {
  const p = store.dispatch(userApi.endpoints.getUser.initiate());
  try {
    const response = await p.unwrap();
    return response;
  } catch (err) {
    return redirect("/");
  } finally {
    p.unsubscribe();
  }
};
