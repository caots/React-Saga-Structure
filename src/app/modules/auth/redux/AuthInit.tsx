import { FC, useRef, useEffect, useState } from 'react';
import { connect, useDispatch, ConnectedProps } from 'react-redux';
import { disableSplashScreen, enableSplashScreen, LayoutSplashScreen } from '../../../../theme/layout/core';
import { RootState } from '../../../../setup';
import { useAppSelector } from '../../../../setup/redux/Hooks';
import { HTTP_RESPONSE_STATUS } from '../../../../setup/constants/Http';
import authApi from "./AuthApi";
import { Response } from '../../../../setup/axios/HttpResponse';
import { UserInfoModel, UserModel } from "../models/AuthModel";
import { updateStylePage } from '../../../utils/helpers';
import { authActions, selectAuth } from './AuthSlice';

const mapState = (state: RootState) => ({ auth: state.auth })
const connector = connect(mapState, authActions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const didRequest = useRef(false)
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const authInfo = useAppSelector(selectAuth);

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      enableSplashScreen();
      try {
        if (!didRequest.current) {
          const responseUserInfo: Response<UserInfoModel> = await authApi.getUserInfo();
          if (responseUserInfo.status === HTTP_RESPONSE_STATUS.SUCCESS) {
            dispatch(authActions.setUserInfo(responseUserInfo.data));
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          dispatch(authActions.logout())
        }
      } finally {
        disableSplashScreen();
        setShowSplashScreen(false);
      }
      return () => (didRequest.current = true)
    }

    if (authInfo && authInfo.token) {
      requestUser()
    } else {
      disableSplashScreen()
      dispatch(authActions.logout())
      setShowSplashScreen(false)
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default connector(AuthInit)
