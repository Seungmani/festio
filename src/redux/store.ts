import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from "./userSlice";
import filterReducer from "./filterSlice";
import apiDataReducer from "./apiDataSlice";

const persistConfigData = {
  key: 'apiData',
  storage: storageSession, 
  whitelist: ['data'], 
};

const periodicConfigUser = {
  key: 'user',
  storage: storageSession, 
  whitelist: ['user', 'isAuthenticated', 'likes'], 
}

const persistedApiDataReducer = persistReducer(persistConfigData, apiDataReducer);
const persistedUserReducer = persistReducer(periodicConfigUser, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    apiData: persistedApiDataReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

