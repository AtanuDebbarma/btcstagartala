import {auth} from '@/services/firebase';
import React from 'react';
import {ReactNode, useEffect, useState} from 'react';
import {ClipLoader} from 'react-spinners';
import {appStore} from './appStore/appStore';
import {onIdTokenChanged, User} from 'firebase/auth';

/**
 * A wrapper component that manages user authentication state.
 *
 * This component listens for changes in the user's ID token and updates the
 * application state with the user and token information. It displays a loading
 * spinner while the authentication state is being determined and renders its
 * child components once loading is complete.
 *
 * @param children - The child components to render once authentication is determined.
 * @returns {React.JSX.Element} The rendered AuthWrapper component.
 */
export const AuthWrapper = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const {setUser} = appStore(state => ({
    setUser: state.setUser,
  }));

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (loading)
    return (
      <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
        <ClipLoader size={30} color="#1a3bdf" />
      </div>
    );

  return <>{children}</>;
};
