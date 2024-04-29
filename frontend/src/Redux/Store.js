import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/User";
export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
