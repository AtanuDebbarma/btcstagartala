import {useState} from 'react';
import {DocumentTableBody} from './documentTableBody';
import {ClipLoader} from '@/components/Spinner';
import {appStore} from '@/appStore/appStore';
import {DocumentAdminModal} from './documentAdminModal';

type DocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: any;
  order?: number;
  public_id?: string; // For notice board (Cloudinary)
};

type CollectionType = 'aicte' | 'iqac' | 'misc-documents';

type Props = {
  collectionType: CollectionType;
  pageTitle: string;
};

export const DocumentTableMain = ({collectionType, pageTitle}: Props) => {
  const [downloading, setDownloading] = useState(false);
  const user = appStore(state => state.user);
  const aicteDocuments = appStore(state => state.aicteDocuments);

  // Get documents from store based on collection type
  const getDocuments = (): DocumentType[] => {
    switch (collectionType) {
      case 'aicte':
        return aicteDocuments;
      default:
        return [];
    }
  };

  const documents = getDocuments();

  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<'ADD' | 'EDIT' | 'DELETE'>('ADD');
  const [selectedDocument, setSelectedDocument] = useState<DocumentType>({
    id: '',
    name: '',
    url: '',
    createdAt: null,
  });

  const handleModal = (
    type: 'ADD' | 'EDIT' | 'DELETE',
    document?: DocumentType,
  ) => {
    setTimeout(() => {
      setOpenModal(true);
      setMode(type);
      if (document) {
        setSelectedDocument(document);
      } else {
        setSelectedDocument({
          id: '',
          name: '',
          url: '',
          createdAt: null,
        });
      }
    }, 200);
  };

  if (downloading) {
    return (
      <div className="mt-20 flex h-full w-full items-center justify-center">
        <ClipLoader size={50} color={'#900090'} loading={downloading} />
      </div>
    );
  }

  return (
    <table className="mt-10 w-[90%] overflow-x-auto rounded-lg text-left shadow-md">
      <thead className="border bg-gray-200 text-[12px] font-medium text-gray-700 sm:text-sm">
        <tr>
          <th className="w-8 px-1 py-3 sm:w-16 sm:px-4">SL</th>
          <th className="px-2 py-3 text-nowrap sm:px-4">{'DOCUMENT TITLE'}</th>
          <th className="w-16 px-4 py-3 text-center sm:w-32 sm:px-8">DATE</th>
          <th className="w-12 px-4 py-3 text-center sm:w-24 sm:px-8">
            <span className="flex flex-row items-center justify-center gap-2">
              <span>ACTION</span>
              {isAdmin && documents.length === 0 && (
                <i
                  onClick={() => handleModal('ADD')}
                  className="fa-solid fa-plus transform-transform cursor-pointer rounded-full bg-white p-1 text-green-600 duration-180 ease-in-out hover:text-green-800 active:scale-90"
                  title={`ADD ${pageTitle.toUpperCase()}`}
                />
              )}
            </span>
          </th>
        </tr>
      </thead>
      <DocumentTableBody
        collectionType={collectionType}
        documents={documents}
        setDownloading={setDownloading}
        handleModal={handleModal}
      />

      {openModal && isAdmin && (
        <DocumentAdminModal
          collectionType={collectionType}
          openModal={openModal}
          setOpenModal={setOpenModal}
          mode={mode}
          selectedDocument={selectedDocument}
        />
      )}
    </table>
  );
};
