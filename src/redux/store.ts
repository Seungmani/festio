import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from "./userSlice";
import apiDataReducer from "./apiDataSlice";

const persistConfig = {
  key: 'apiData',
  storage: storageSession, 
  whitelist: ['data'], 
};

const persistedApiDataReducer = persistReducer(persistConfig, apiDataReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    apiData: persistedApiDataReducer ,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

