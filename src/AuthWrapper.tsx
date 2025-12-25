import {auth} from '@/services/firebase';
import React from 'react';
import {type ReactNode, useEffect} from 'react';
import {appStore} from './appStore/appStore';
import {onIdTokenChanged, type User} from 'firebase/auth';

/**
 * AuthWrapper is a higher-order component that wraps its children with authentication logic.
 *
 * It listens for changes in the authentication state using `onIdTokenChanged` and updates
 * the global state with the user information. Admin status is checked on the frontend by
 * verifying the user's email against the admin whitelist. Backend validation occurs on
 * every admin action for security.
 *
 * This component renders immediately without blocking the UI, allowing for fast page loads.
 * Authentication checking happens asynchronously in the background.
 *
 * @param {ReactNode} children - The components to render immediately.
 * @returns {React.JSX.Element} The wrapped children components without blocking.
 */

export const AuthWrapper = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const setUser = appStore(state => state.setUser);
  const setAuthInitialized = appStore(state => state.setAuthInitialized);

  // Initialize auth state asynchronously in background (non-blocking)
  useEffect(() => {
    // Check if there's already a current user (for existing sessions)
    const checkCurrentUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const adminEmails = [
          import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
          import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
        ];

        if (adminEmails.includes(currentUser.email || '')) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Check immediately for existing user
    void checkCurrentUser();

    // Set up listener for auth state changes
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
    });

    return () => unsubscribe();
  }, [setUser, setAuthInitialized]);

  // Render immediately without waiting for auth check
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <React.Fragment>{children}</React.Fragment>;
};
