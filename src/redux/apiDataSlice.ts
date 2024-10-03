// src/redux/apiDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ApiDataProps {
	age: string;
	call: string
	description: string
	genre: string
	imageUrl: string
	link: string
	localId: string
	period: string
	time: string
	title: string
  author: string
  actor: string
  contact: string
  charge: string
  numberPages: string
  duration: string
  subDescription: string
  spatial: string
  site: string
}

interface ApiDataState {
  data: ApiDataProps[];
  loading: boolean;
  error: string | null;
}

const initialState: ApiDataState = {
  data: [],
  loading: false,
  error: null,
};

const apiDataSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    fetchApiDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchApiDataSuccess(state, action: PayloadAction<ApiDataProps[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchApiDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchApiDataStart, fetchApiDataSuccess, fetchApiDataFailure } = apiDataSlice.actions;
export default apiDataSlice.reducer;
