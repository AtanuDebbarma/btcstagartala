import {auth} from '@/services/firebase';
import React from 'react';
import {ReactNode, useEffect, useState} from 'react';
import {ClipLoader} from 'react-spinners';
import {appStore} from './appStore/appStore';
import {onIdTokenChanged, User} from 'firebase/auth';

/**
 * AuthWrapper is a higher-order component that wraps its children with authentication logic.
 *
 * It listens for changes in the authentication state using `onIdTokenChanged` and updates
 * the global state with the user information. Admin status is checked on the frontend by
 * verifying the user's email against the admin whitelist. Backend validation occurs on
 * every admin action for security.
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
        // Check if user is admin (frontend check for UI only)
        const adminEmails = [
          import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
          import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
        ];

        if (adminEmails.includes(user.email || '')) {
          setUser(user);
        } else {
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
