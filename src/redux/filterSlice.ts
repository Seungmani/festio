import { createSlice } from "@reduxjs/toolkit";

export interface FilterSliceProps {
	search: string;
	searchOption: string;
	sortOption: string;
	isShowLike: boolean;
}

const initialState: FilterSliceProps = {
  search: "",
	searchOption: "공연이름",
	sortOption: "recent",
	isShowLike: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.search = action.payload;
    },
    setSearchOption(state, action) {
      state.searchOption = action.payload;
    },
		setSortOption(state, action) {
      state.sortOption = action.payload;
    },
		setIsShowLike(state, action) {
      state.isShowLike = action.payload;
    },
  },
});

export const { setSearchTerm, setSearchOption, setSortOption, setIsShowLike} = filterSlice.actions;
export default filterSlice.reducer;
