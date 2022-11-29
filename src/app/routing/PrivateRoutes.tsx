import HomePage from 'app/modules/home/HomePage';
import { PageUrl } from 'app/utils/common/constants';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FallbackView } from 'theme/layout/components/fallbackView/FallbackView';

export function PrivateRoutes() {
  // const UsersPage = lazy(() => import('../modules/users/UserPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path={PageUrl.HOME} component={HomePage}/>
        {/* <Route path={PageUrl.USERS.ROOT} component={UsersPage}/> */}
        <Redirect from='/auth' to='/home' />
        <Redirect exact from='/' to='/home' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  ) 
}
