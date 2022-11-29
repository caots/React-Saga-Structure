import { HTTP_STATUS } from '../constants/Http';
import { AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import { ToastDefaultConfig } from '../toast/ToastConfig';
import { EventBus } from '../../app/utils/helpers';
import { EventBusName } from '../../app/utils/common/constants';

export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: any) => {
      const {auth: { authInfo }} = store.getState()
      if (authInfo && authInfo.token) {
        config.headers.Authorization = `Bearer ${authInfo.token}`
      }
      return config;
    },
    (err: any) => Promise.reject(err)
  );

  // Add a response interceptor
  axios.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === HTTP_STATUS.CREATED || response.status === HTTP_STATUS.OK) {
      return response.data;
    }
    return Promise.reject(response);
  }, function (err: any) {
    const { status, data } = err.response;
    if (err.message === 'Network Error' && !err.response) {
      toast.error("Network error - make sure API is running", ToastDefaultConfig());
      return Promise.reject('Network error');
    }

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      EventBus.getInstance().dispatch<null>(EventBusName.UNAUTHORIZED_REQUEST);
    } else {
      if (data.message) {
        toast.error(data.message, ToastDefaultConfig());
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(err);
  });
}
