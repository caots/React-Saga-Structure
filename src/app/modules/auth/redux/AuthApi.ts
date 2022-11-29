import { UserMetaData, UserInfoModel } from './../models/AuthModel';
import axios from 'axios';
import { LoginParam, UserModel, AuthModel } from '../models/AuthModel';
import { Response } from '../../../../setup/axios/HttpResponse';

const API_URL = process.env.REACT_APP_API_URL;

const authApi = {
  login(param: LoginParam): Promise<Response<{ auth: AuthModel, user: UserModel, userMetaData: UserMetaData}>> {
    const url = `${API_URL}/api/v1/users/login`;
    return axios.post(url, {
      ...param
    });
  },
  getUserInfo(): Promise<Response<UserInfoModel>> {
    const url = `${API_URL}/api/v1/users/info`;
    return axios.get(url);
  },
}

export default authApi;