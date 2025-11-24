import {auth} from '@/services/firebase';
import React from 'react';
import {ReactNode, useEffect, useState} from 'react';
import {ClipLoader} from 'react-spinners';
import {appStore} from './appStore/appStore';
import {getIdToken, onIdTokenChanged, User} from 'firebase/auth';

const BASE_URL: string =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000';

/**
 * AuthWrapper is a higher-order component that wraps its children with authentication logic.
 *
 * It listens for changes in the authentication state using `onIdTokenChanged` and fetches
 * a protected resource to verify the user's authentication status. If the user is authenticated,
 * it updates the global state with the user information; otherwise, it sets the user to null.
 *
 * While the authentication state is being determined, a loading spinner is displayed.
 * Once the authentication check is complete, it renders its children.
 *
 * @param {ReactNode} children - The components to render after authentication is verified.
 * @returns {React.JSX.Element} A loading spinner or the wrapped children components.
 */

export const AuthWrapper = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const setUser = appStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const token = await getIdToken(user);

          const response = await fetch(`${BASE_URL}/api/protected`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setUser(user);
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error('Backend verification failed:', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (loading)
    return (
      <div className="flex h-[screen] w-[screen] flex-col items-center justify-center">
        <ClipLoader size={30} color="#1a3bdf" />
      </div>
    );

  return <>{children}</>;
};
