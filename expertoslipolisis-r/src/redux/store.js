import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import imagesReducer from "./slices/imageSlice";
import patientReducer from "./slices/patientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imagesReducer,
    patients: patientReducer,
  },
});
