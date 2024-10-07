import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface likesProps {
  id: string;
  title: string;
  period: string;
}

interface userProps {
  uid: string;
  phone: string;
  email: string;
}

export interface UserSliceProps {
	user: null | userProps;
	isAuthenticated: boolean;
  likes: likesProps[] | [];
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
    setLike(state, action: PayloadAction<likesProps[]>) {
      state.likes = action.payload;
    }
  },
});

export const { setUser, clearUser, setLike } = userSlice.actions;
export default userSlice.reducer;
