import {appStore} from '@/appStore/appStore';
import {convertFirebaseTimestampToDate} from '@/utils/dateTransform';
import {DocumentButtons} from './documentButtons';
import {DocumentAdminButtons} from './documentAdminButtons';
import {DocumentNameOrLink} from './documentNameOrLink';
import React from 'react';

type DocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: any;
  order?: number;
  public_id?: string;
};

type CollectionType =
  | 'notice-board'
  | 'aicte'
  | 'iqac'
  | 'dhe'
  | 'academic-calendar'
  | 'misc-documents'
  | 'help-desk'
  | 'aishe'
  | 'committee-cells'
  | 'results';

interface Props {
  collectionType: CollectionType;
  documents: DocumentType[];
  setDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (
    type: 'ADD' | 'EDIT' | 'DELETE',
    document?: DocumentType,
  ) => void;
}

export const DocumentTableBody = React.memo(
  ({collectionType, documents, setDownloading, handleModal}: Props) => {
    const user = appStore(state => state.user);

    const allowedAdminEmails: string[] = [
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
    ];
    const isAdmin = allowedAdminEmails.includes(user?.email || '');

    // Sort documents by createdAt (recent first)
    const sortedDocuments = [...documents].sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;

      // Handle Firestore Timestamp
      if (a.createdAt.toMillis && b.createdAt.toMillis) {
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      }

      // Handle plain timestamp object from backend
      const aTime =
        a.createdAt._seconds !== undefined
          ? a.createdAt._seconds * 1000
          : new Date(a.createdAt).getTime();
      const bTime =
        b.createdAt._seconds !== undefined
          ? b.createdAt._seconds * 1000
          : new Date(b.createdAt).getTime();

      return bTime - aTime;
    });

    return (
      <tbody className="text-[12px] sm:text-sm">
        {sortedDocuments.length > 0 ? (
          sortedDocuments.map((document, index) => (
            <tr key={document.id} className="border bg-white hover:bg-gray-50">
              <td className="px-2 py-3 sm:px-4">{index + 1}</td>
              <DocumentNameOrLink
                name={document.name}
                url={document.url}
                isAdmin={isAdmin}
              />
              <td className="px-4 py-3 text-center text-nowrap sm:px-8">
                {convertFirebaseTimestampToDate(document.createdAt)}
              </td>
              {!isAdmin && (
                <DocumentButtons
                  document={document}
                  setDownloading={setDownloading}
                />
              )}
              {isAdmin && (
                <DocumentAdminButtons
                  document={document}
                  handleModal={handleModal}
                />
              )}
            </tr>
          ))
        ) : (
          <tr className="border bg-white">
            <td colSpan={4}>
              <div className="flex w-full justify-center py-10 text-gray-800">
                {collectionType === 'notice-board'
                  ? 'To Be Announced'
                  : 'No Documents Available'}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    );
  },
);
