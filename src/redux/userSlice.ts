import { createSlice } from "@reduxjs/toolkit";

export interface UserSliceProps {
	user: null | string;
	isAuthenticated: boolean;
  likes: string[];
}

const initialState: UserSliceProps = {
  user: null,
  isAuthenticated: false,
  likes: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLike(state, action) {
      state.likes = action.payload;
    },
  },
});

export const { setUser, clearUser, setLike } = userSlice.actions;
export default userSlice.reducer;
