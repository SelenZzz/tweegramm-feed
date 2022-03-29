import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { iUser } from '../utils/types';

export interface userState {
  logged: boolean;
  uuid: string | undefined;
  username: string | undefined;
}

const initialState: userState = {
  logged: false,
  uuid: undefined,
  username: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: iUser }>) => {
      state.uuid = action.payload.user.uuid;
      state.username = action.payload.user.username;
      state.logged = true;
    },
    logout: (state) => {
      state.logged = false;
      state.uuid = undefined;
      state.username = undefined;
    },
  },
});

export const userActions = userSlice.actions;

export const selectLogged = (state: RootState) => state.user.logged;
export const selectUserUid = (state: RootState) => state.user.uuid;
export const selectUserUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;
