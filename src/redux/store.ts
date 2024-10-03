import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import apiDataReducer from "./apiDataSlice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    apiData: apiDataReducer, // db에서 불러오기
    [api.reducerPath]: api.reducer, // api로 불러오기
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

