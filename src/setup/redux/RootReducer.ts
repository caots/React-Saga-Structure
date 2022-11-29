import { authActions } from './../../app/modules/auth/redux/AuthSlice';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from '../../app/modules/auth';
import * as home from '../../app/modules/home/redux';
import { PayloadAction } from '@reduxjs/toolkit';

const mainReducer = combineReducers({
  auth: auth.authReducer,
  home: home.homeReducer,
})

export const rootReducer = (state: any, action: PayloadAction) => {
  return action.type === authActions.logout.type ? mainReducer({auth: state.auth} as any, action) :  mainReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([
    auth.authSaga(), 
    home.homeSaga(),
  ])
}