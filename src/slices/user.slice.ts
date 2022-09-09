import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User, { UserSlice } from '../models/user.model';
import { RootState } from '../store';

const initialState: UserSlice = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user; // TODO type this

export default userSlice.reducer;
