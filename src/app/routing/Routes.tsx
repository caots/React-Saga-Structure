/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { RootState } from '../../setup'
import { MasterInit } from '../../theme/layout/MasterInit'
import { MasterLayout } from '../../theme/layout/MasterLayout'
import { AuthPage, Logout } from '../modules/auth'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { PrivateRoutes } from './PrivateRoutes'

const Routes: FC = () => {
  const isAuthorized = useSelector<RootState>(({ auth }) => auth.user, shallowEqual)

  return (
    <>
      <Switch>
        {/* {!isAuthorized ? (
          <Route>
            <AuthPage />
          </Route>
        ) : (
          <Redirect from='/auth' to='/' />
        )} */}
        <Route path='/error' component={ErrorsPage} />
        <Route path='/logout' component={Logout} />
        <MasterLayout>
          <PrivateRoutes />
        </MasterLayout>
        {/* {!isAuthorized ? (
          <Redirect to='/auth/login' />
        ) : (
          <>
            <MasterLayout>
              <PrivateRoutes />
            </MasterLayout>
          </>
        )} */}
      </Switch>
      <MasterInit />
    </>
  )
}

export { Routes }
