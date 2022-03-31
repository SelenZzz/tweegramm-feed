import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { iUser } from '../utils/types';

export interface userState {
  logged: boolean;
  username: string | undefined;
}

const initialState: userState = {
  logged: false,
  username: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
      state.logged = true;
    },
    logout: (state) => {
      state.logged = false;
      state.username = undefined;
    },
  },
});

export const userActions = userSlice.actions;

export const selectLogged = (state: RootState) => state.user.logged;
export const selectUserUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;
