import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from '../../setup';

const RouteAuthenticated = ({
  component,
  role,
  path,
}: {
  component: React.ComponentType;
  role: string;
  path: string;
}) => {

  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Redirect to='/login' />
  } 
  
  // if (!user.roles?.includes(role)) {
  //   return <Redirect to='/error/404' />
  // }

  return <Route path={path} component={component} />
};

export default RouteAuthenticated;