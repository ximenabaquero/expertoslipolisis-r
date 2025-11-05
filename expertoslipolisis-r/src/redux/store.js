import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import imagesReducer from "./slices/imageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imagesReducer,
  },
});
