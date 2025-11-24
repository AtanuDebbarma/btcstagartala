import {appStore} from '@/appStore/appStore';
import {AlertsType, CarouselModeType} from '@/types/homeTypes';
import {convertFirebaseTimestampToDate} from '@/utils/dateTransform';

import React from 'react';
import {Timestamp} from 'firebase/firestore';
import {AlertNameOrLink} from './alertNameOrLink';
import {AlertButtons} from './alertButtons';
import {AlertAdminButtons} from './alertAdminButons';

interface PROPS {
  handleModal: (
    type: CarouselModeType,
    id: string,
    title: string,
    content: string,
    fileName: string,
    fileURL: string,
    file_public_id: string,
    link1Name: string,
    link1Url: string,
    link2Name: string,
    link2Url: string,
    createdAt: Timestamp | null,
  ) => void;
}
export const AlertsTableBody = React.memo(({handleModal}: PROPS) => {
  const user = appStore(state => state.user);
  const alerts = appStore(state => state.alerts);

  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  // Sort notices by createdAt (recent first)
  const sortedNotices = [...alerts].sort((a: AlertsType, b: AlertsType) => {
    if (!a.createdAt || !b.createdAt) return 0; // fallback if createdAt missing
    return b.createdAt.toMillis() - a.createdAt.toMillis(); // Firestore Timestamp to millis
  });
  return (
    <tbody className="text-[12px] sm:text-sm">
      {sortedNotices.length > 0 ? (
        sortedNotices.map((alert, index) => (
          <tr key={alert.id} className="border bg-white hover:bg-gray-50">
            <td className="px-2 py-3 sm:px-4">{index + 1}</td>
            <AlertNameOrLink
              title={alert.title}
              id={alert.id}
              isAdmin={isAdmin}
            />
            <td className="px-4 py-3 text-center text-nowrap sm:px-8">
              {convertFirebaseTimestampToDate(alert.createdAt)}
            </td>
            {!isAdmin && <AlertButtons alert={alert} />}

            {isAdmin && (
              <AlertAdminButtons alert={alert} handleModal={handleModal} />
            )}
          </tr>
        ))
      ) : (
        <tr className="border bg-white">
          <td colSpan={4}>
            <div className="flex w-full justify-center py-10 text-gray-800">
              To Be Announced
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
});
