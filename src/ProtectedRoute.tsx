import {type ReactNode} from 'react';
import {appStore} from './appStore/appStore';
import {Navigate} from 'react-router-dom';
import {RouteNames} from './constants/routeNames';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const user = appStore(state => state.user);

  if (user) {
    return <Navigate to={RouteNames.HOME} replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
