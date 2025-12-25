import {useState} from 'react';
import {NoticeTableBody} from './noticeTableBody';
import {ClipLoader} from '@/components/Spinner';
import {appStore} from '@/appStore/appStore';
import type {CarouselModeType, NoticeBoardType} from '@/types/homeTypes';
import type {Timestamp} from 'firebase/firestore';
import {NoticeAdminModal} from './noticeAdminModal';

export const NoticesTableMain = () => {
  const [downloading, setDownloading] = useState(false);
  const user = appStore(state => state.user);
  const notices = appStore(state => state.notices);

  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<CarouselModeType>('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeBoardType>({
    id: '',
    name: '',
    url: '',
    public_id: '',
    createdAt: null,
  });

  const handleModal = (
    type: CarouselModeType,
    id: string,
    name: string,
    url: string,
    public_id: string,
    createdAt: Timestamp | null,
  ) => {
    setTimeout(() => {
      setOpenModal(true);
      setMode(type);
      setSelectedNotice({
        id: id,
        name: name,
        url: url,
        public_id: public_id,
        createdAt: createdAt,
      });
    }, 200);
  };

  if (downloading) {
    return (
      <div className="mt-20 flex h-full w-full items-center justify-center">
        <ClipLoader size={50} color={'#0029af'} loading={downloading} />
      </div>
    );
  }
  return (
    <table className="mt-10 w-[90%] overflow-x-auto rounded-lg text-left shadow-md">
      <thead className="border bg-gray-200 text-[12px] font-medium text-gray-700 sm:text-sm">
        <tr>
          <th className="w-8 px-1 py-3 sm:w-16 sm:px-4">SL</th>
          <th className="px-2 py-3 text-nowrap sm:px-4">NOTICE TITLE</th>
          <th className="w-16 px-4 py-3 text-center sm:w-32 sm:px-8">DATE</th>
          <th className="w-12 px-4 py-3 text-center sm:w-24 sm:px-8">
            <span className="flex flex-row items-center justify-center gap-2">
              <span>ACTION</span>
              {isAdmin && notices.length === 0 && (
                <i
                  onClick={() => handleModal('ADD', '', '', '', '', null)}
                  className="fa-solid fa-plus transform-transform cursor-pointer rounded-full bg-white p-1 text-green-600 duration-180 ease-in-out hover:text-green-800 active:scale-90"
                  title="ADD NOTICE"
                />
              )}
            </span>
          </th>
        </tr>
      </thead>
      <NoticeTableBody
        setDownloading={setDownloading}
        handleModal={handleModal}
      />

      {openModal && isAdmin && (
        <NoticeAdminModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          mode={mode}
          selectedNotice={selectedNotice}
        />
      )}
    </table>
  );
};
