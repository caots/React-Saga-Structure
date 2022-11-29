import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { Response } from '../../../../setup/axios/HttpResponse';
import { HTTP_RESPONSE_STATUS } from "../../../../setup/constants/Http";
import { AuthModel, LoginParam, UserModel } from "../models/AuthModel";
import { UserMetaData } from './../models/AuthModel';
import authApi from "./AuthApi";
import { authActions } from './AuthSlice';

function* loginRequest(action: PayloadAction<LoginParam>) {
  try {
    const response: Response<{ auth: AuthModel, user: UserModel, userMetaData: UserMetaData }> = yield call(authApi.login, action.payload);
    if (response.status === HTTP_RESPONSE_STATUS.SUCCESS) {
      yield put(authActions.loginSuccess(response.data));
    } else {
      yield put(authActions.loginFailed());
      alert(response.message);
    }
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

export function* authSaga() {
  yield takeLatest(authActions.login.type, loginRequest);
}