import React, { Suspense } from 'react'
import { LayoutProvider, LayoutSplashScreen } from '../theme/layout/core'
import AuthInit from './modules/auth/redux/AuthInit'
import { Routes } from './routing/Routes'
import '../theme/i18n/i18nProvider';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { EventBusName } from './utils/common/constants'
import { EventBus } from './utils/helpers'
import { authActions } from './modules/auth'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
type Props = {
  basename: string
}

const App: React.FC<Props> = ({ basename }) => {
  const dispatch = useDispatch();
  EventBus.getInstance().register(
    EventBusName.UNAUTHORIZED_REQUEST,
    () => {
        dispatch(authActions.logout());
    }
  );
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
        <LayoutProvider>
          <AuthInit>
            <Routes />
            <ToastContainer closeOnClick />
          </AuthInit>
        </LayoutProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export { App }
