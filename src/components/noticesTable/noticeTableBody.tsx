import {appStore} from '@/appStore/appStore';
import {CarouselModeType, NoticeBoardType} from '@/types/homeTypes';
import {convertFirebaseTimestampToDate} from '@/utils/dateTransform';
import {NoticeButtons} from './noticeButtons';
import {Dispatch, SetStateAction} from 'react';
import {NoticeAdminButtons} from './noticeAdminButtons';
import React from 'react';
import {NoticeNameOrLink} from './noticeNameOrLink';
import {Timestamp} from 'firebase/firestore';

interface PROPS {
  setDownloading: Dispatch<SetStateAction<boolean>>;
  handleModal: (
    type: CarouselModeType,
    id: string,
    name: string,
    url: string,
    public_id: string,
    createdAt: Timestamp | null,
  ) => void;
}
export const NoticeTableBody = React.memo(
  ({setDownloading, handleModal}: PROPS) => {
    const user = appStore(state => state.user);
    const notices = appStore(state => state.notices);

    const allowedAdminEmails: string[] = [
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
    ];
    const isAdmin = allowedAdminEmails.includes(user?.email || '');

    // Sort notices by createdAt (recent first)
    const sortedNotices = [...notices].sort(
      (a: NoticeBoardType, b: NoticeBoardType) => {
        if (!a.createdAt || !b.createdAt) return 0; // fallback if createdAt missing
        return b.createdAt.toMillis() - a.createdAt.toMillis(); // Firestore Timestamp to millis
      },
    );
    return (
      <tbody className="text-[12px] sm:text-sm">
        {sortedNotices.length > 0 ? (
          sortedNotices.map((notice, index) => (
            <tr key={notice.id} className="border bg-white hover:bg-gray-50">
              <td className="px-2 py-3 sm:px-4">{index + 1}</td>
              <NoticeNameOrLink
                name={notice.name}
                url={notice.url}
                isAdmin={isAdmin}
              />
              <td className="px-4 py-3 text-center text-nowrap sm:px-8">
                {convertFirebaseTimestampToDate(notice.createdAt)}
              </td>
              {!isAdmin && (
                <NoticeButtons
                  notice={notice}
                  setDownloading={setDownloading}
                />
              )}
              {isAdmin && (
                <NoticeAdminButtons notice={notice} handleModal={handleModal} />
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
  },
);
