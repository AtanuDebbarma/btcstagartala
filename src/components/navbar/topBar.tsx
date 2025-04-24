import {appStore} from '@/appStore/appStore';
import {RouteNames} from '@/constants/routeNames';
import {auth} from '@/services/firebase';
import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export const TopBar = () => {
  const user = appStore(state => state.user);
  const isAdmin = user?.email === import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setShowLogoutModal(false);
      navigate(RouteNames.HOME);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowLogoutModal(false);
      }
    };

    if (showLogoutModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogoutModal]);

  return (
    <div className="bg-gray-900 px-4 py-2 text-white">
      <div className="flex flex-wrap items-center justify-center sm:justify-between">
        <div>
          <p className="text-lg font-bold">
            {isAdmin && 'You are now in Admin mode.'}
          </p>
        </div>
        <div className="mt-2 flex items-center space-x-3 md:mt-0">
          {!isAdmin && (
            <a
              href="#"
              className="rounded bg-yellow-600 px-3 py-1 text-sm font-bold text-black transition-transform duration-150 ease-in-out hover:bg-yellow-700 active:scale-90">
              <span className="animate-blink"> ADMISSIONS - APPLY</span>
            </a>
          )}
          <a
            href="#"
            className="rounded bg-yellow-600 px-3 py-1 text-xs font-bold text-black transition-transform duration-150 ease-in-out hover:bg-yellow-700 active:scale-90 sm:text-sm">
            <span className="animate-blink"> ADMISSIONS - APPLY</span>
          </a>

          <a
            href="#"
            className="text-sm transition-transform duration-150 ease-in-out hover:text-blue-300 active:scale-90">
            NOTICE
          </a>
          <Link
            to={RouteNames.CONTACT}
            className="text-sm transition-transform duration-150 ease-in-out hover:text-blue-300 active:scale-90">
            CONTACT
          </Link>
          {!isAdmin ? null : (
            <button
              onClick={() =>
                setTimeout(() => {
                  setShowLogoutModal(true);
                }, 200)
              }
              className="rounded bg-blue-700 px-3 py-1 text-sm transition-transform duration-150 ease-in-out hover:text-blue-300 active:scale-90">
              LOGOUT
            </button>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/30">
          <div
            ref={modalRef}
            className="w-[90%] max-w-md rounded-xl bg-white p-6 text-black shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="rounded bg-gray-200 px-4 py-2 text-sm transition-transform duration-150 ease-in-out hover:bg-gray-300 active:scale-90"
                onClick={() =>
                  setTimeout(() => {
                    setShowLogoutModal(false);
                  }, 200)
                }>
                Cancel
              </button>
              <button
                className="rounded bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-600"
                onClick={() =>
                  setTimeout(() => {
                    handleLogout;
                  }, 200)
                }>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
