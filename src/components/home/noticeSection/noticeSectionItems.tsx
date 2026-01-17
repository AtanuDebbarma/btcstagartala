import type {NoticeBoardType, PermanentAffiliationType} from '@/types/homeTypes';
import {convertFirebaseTimestampToDate} from '@/utils/dateTransform';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {appStore} from '@/appStore/appStore';
import {AdminInteractionBtns} from '@/appComponents/adminInteractionBtns';
import EditPermanentAffiliationModal from './editPermanentAffiliationModal';

export const NoticeItem = React.memo(({notice}: {notice: NoticeBoardType}) => {
  const timeStamptoDate = convertFirebaseTimestampToDate(notice.createdAt);
  const navigation = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      void navigation(`/pdf-viewer?file=${notice.url}`);
    }, 200);
  };

  return (
    <div
      onClick={handleClick}
      className="group mb-4 grid h-full w-full cursor-pointer grid-cols-1 gap-2 border-gray-200 px-4 pb-4 transition-transform duration-180 ease-in-out last:border-0 active:scale-95 sm:grid-cols-12">
      {/* Notice Name (takes 8/12 cols on sm+) */}
      <div className="sm:col-span-8">
        <p className="wrap-break-words text-gray-800 transition-colors duration-180 ease-in-out group-hover:text-blue-800 group-hover:underline">
          {notice.name}
        </p>
      </div>

      {/* Date (takes 4/12 cols on sm+) */}
      <div className="sm:col-span-4 sm:text-right">
        <p className="text-nowrap text-gray-800">{timeStamptoDate}</p>
      </div>
    </div>
  );
});
interface Props {
  text: string;
  url: string;
}

export const NavButton = React.memo(({text, url}: Props) => {
  const navigation = useNavigate();
  const handleClick = () => {
    setTimeout(() => {
      void navigation(`/pdf-viewer?file=${url}`);
    }, 200);
  };
  return (
    <button
      onClick={handleClick}
      className="w-full min-w-62.5 cursor-pointer transition-transform duration-180 ease-in-out focus:outline-none active:scale-95">
      <div
        className={`rounded-sm bg-[#3f003f] px-4 py-4 text-center text-white shadow-md`}>
        <h3 className="relative inline-block text-lg font-semibold tracking-wide text-nowrap uppercase">
          {text}
          <span className="absolute -bottom-1 left-1/4 mt-2 h-0.75 w-1/2 rounded bg-yellow-400"></span>
        </h3>
      </div>
    </button>
  );
});

export const AccreditationCard = React.memo(
  ({
    id,
    name,
    logo,
    isMoreButton,
  }: {
    id?: number;
    name: string;
    logo: string;
    isMoreButton?: boolean;
  }) => {
    const navigation = useNavigate();
    const permanentAffiliation = appStore(state => state.permanentAffiliation);
    const setPermanentAffiliation = appStore(
      state => state.setPermanentAffiliation,
    );
    const user = appStore(state => state.user);
    const [onHoverAffiliation, setOnHoverAffiliation] =
      useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const allowedAdminEmails: string[] = [
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
    ];
    const isAdmin = allowedAdminEmails.includes(user?.email || '');

    const handleClick = (e: React.MouseEvent) => {
      // Don't navigate if clicking on edit button
      if ((e.target as HTMLElement).closest('.edit-button')) {
        return;
      }

      // Navigate to AICTE page if id is 2
      if (id === 2) {
        setTimeout(() => {
          void navigation('/aicte');
          scrollTo(0, 0);
        }, 200);
      }
      // Navigate to permanent affiliation - use dynamic URL if available
      if (id === 4) {
        setTimeout(() => {
          if (permanentAffiliation?.url) {
            // Use dynamic URL from Firebase
            void navigation(
              `/pdf-viewer?file=${encodeURIComponent(permanentAffiliation.url)}`,
            );
          } else {
            // Fallback to redirect route (which will handle the old URL)
            void navigation('/permanent-affiliation');
          }
        }, 200);
      }
    };

    const handleEditClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowEditModal(true);
    };

    const handleEditSuccess = async () => {
      // Refresh the permanent affiliation data after successful update
      try {
        const {collection, getDocs} = await import('firebase/firestore');
        const {db} = await import('@/services/firebase');

        const querySnapshot = await getDocs(
          collection(db, 'prospectusAndAdmission'),
        );

        if (!querySnapshot.empty) {
          const permanentAffiliationDoc = querySnapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data(),
            } as PermanentAffiliationType))
            .find(item => item.name === 'Permanent_Affiliation');

          await setPermanentAffiliation(permanentAffiliationDoc || null);
        }
      } catch (error) {
        console.error('Error refreshing permanent affiliation data:', error);
      }
      setShowEditModal(false);
    };

    if (isMoreButton) {
      return (
        <div className="flex min-h-7.5 flex-row items-center justify-center rounded-md bg-[#900090] p-3 text-white shadow md:min-h-37.5">
          <p className="mb-1 text-sm font-semibold">More Accreditations</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      );
    }

    return (
      <>
        <div
          onClick={handleClick}
          onMouseEnter={() => id === 4 && setOnHoverAffiliation(true)}
          onMouseLeave={() => id === 4 && setOnHoverAffiliation(false)}
          className={`relative flex min-h-37.5 flex-col items-center justify-center rounded-md bg-white p-3 text-center shadow transition-transform duration-150 ease-in-out ${
            id === 2 || id === 4
              ? 'cursor-pointer hover:shadow-lg active:scale-95'
              : 'cursor-default'
          }`}>
          {/* Admin Edit Button for Permanent Affiliation (id=4) */}
          {id === 4 &&
            isAdmin &&
            onHoverAffiliation &&
            permanentAffiliation && (
              <div className="edit-button absolute top-0 right-0.5 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-white px-4 py-2 shadow-md">
                <AdminInteractionBtns
                  handleModal={handleEditClick}
                  iconClass="fa-solid fa-pen"
                  title="EDIT"
                  iconColor="text-blue-600"
                  hoverColor="hover:text-blue-800"
                />
              </div>
            )}

          <img
            src={logo}
            alt={name}
            className="mb-2 h-16.25 w-auto object-contain"
            loading="lazy"
          />
          <p className="text-center text-sm text-gray-800">{name}</p>
        </div>

        {/* Edit Modal */}
        {id === 4 && (
          <EditPermanentAffiliationModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            document={permanentAffiliation}
            onSuccess={handleEditSuccess}
          />
        )}
      </>
    );
  },
);
