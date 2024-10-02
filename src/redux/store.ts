import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import apiDataReducer from "./apiDataSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    apiData: apiDataReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

