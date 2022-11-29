import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState } from '../../../../setup';
import { AuthModel, LoginParam, UserInfoModel, UserMetaData, UserModel } from '../models/AuthModel';
export interface IAuthState {
  user?: UserModel
  authInfo?: AuthModel,
  isLoading: boolean,
  userMetaData?: UserMetaData,

}

const initialState: IAuthState = {
  user: undefined,
  authInfo: undefined,
  isLoading: false,
  userMetaData: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginParam>) {
      state.authInfo = undefined;
      state.user = undefined;
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<{ auth: AuthModel, user: UserModel, userMetaData: UserMetaData }>) {
      state.authInfo = action.payload.auth;
      state.user = action.payload.user;
      state.userMetaData = action.payload.userMetaData;
      state.isLoading = false;
    },
    loginFailed(state) {
      state.user = undefined;
      state.authInfo = undefined;
      state.isLoading = false;
    },
    register(state, action: PayloadAction<{ user: UserModel, auth: AuthModel }>) {
      state.authInfo = action.payload.auth;
      state.user = action.payload.user;;
      state.isLoading = true;
    },
    logout(state) {
      state.authInfo = undefined;
      state.user = undefined;
      state.userMetaData = undefined;
      state.isLoading = false;
    },
    setUserInfo(state, action: PayloadAction<UserInfoModel>) {
      state.user = action.payload.userInfo;
      state.userMetaData = action.payload.userMetaData;

    },
  }
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuth = (state: RootState) => state.auth.authInfo;
export const selectLoading = (state: RootState) => state.auth.isLoading;
export const selectUserMetaData = (state: RootState) => state.auth.userMetaData;

// Reducer
const persistConfig = {
  key: 'pe-auth',
  storage: storage,
  whitelist: ['user', 'authInfo']
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

