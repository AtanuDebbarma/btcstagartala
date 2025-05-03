import {useState} from 'react';
import {appStore} from '@/appStore/appStore';
import {AlertsType, CarouselModeType} from '@/types/homeTypes';
import {Timestamp} from 'firebase/firestore';
import {AlertsTableBody} from './alertsTableBody';
import {AlertsAdminModal} from './alertAdminModal';

export const AlertsTableMain = () => {
  const user = appStore(state => state.user);
  const alerts = appStore(state => state.alerts);

  const isAdmin = user?.email === import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<CarouselModeType>('');
  const [selectedAlert, setSelectedAlert] = useState<AlertsType>({
    id: '',
    title: '',
    content: '',
    fileName: '',
    fileURL: '',
    file_public_id: '',
    link1Name: '',
    link1Url: '',
    link2Name: '',
    link2Url: '',
    createdAt: null,
  });

  const handleModal = (
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
  ) => {
    setTimeout(() => {
      setOpenModal(true);
      setMode(type);
      setSelectedAlert({
        id: id,
        title: title,
        content: content,
        fileName: fileName,
        fileURL: fileURL,
        file_public_id: file_public_id,
        link1Name: link1Name,
        link1Url: link1Url,
        link2Name: link2Name,
        link2Url: link2Url,
        createdAt: createdAt,
      });
    }, 200);
  };

  return (
    <table className="mt-10 w-[90%] overflow-x-auto rounded-lg text-left shadow-md">
      <thead className="border bg-gray-200 text-[12px] font-medium text-gray-700 sm:text-sm">
        <tr>
          <th className="w-8 px-1 py-3 sm:w-16 sm:px-4">SL</th>
          <th className="px-2 py-3 text-nowrap sm:px-4">ALERT TITLE</th>
          <th className="w-16 px-4 py-3 text-center sm:w-32 sm:px-8">DATE</th>
          <th className="w-12 px-4 py-3 text-center sm:w-24 sm:px-8">
            <span className="flex flex-row items-center justify-center gap-2">
              <span>ACTION</span>
              {isAdmin && alerts.length === 0 && (
                <i
                  onClick={() =>
                    handleModal(
                      'ADD',
                      '',
                      '',
                      '',
                      '',
                      '',
                      '',
                      '',
                      '',
                      '',
                      '',
                      null,
                    )
                  }
                  className="fa-solid fa-plus transform-transform cursor-pointer rounded-full bg-white p-1 text-green-600 duration-180 ease-in-out hover:text-green-800 active:scale-90"
                  title="ADD ALERT"
                />
              )}
            </span>
          </th>
        </tr>
      </thead>
      <AlertsTableBody handleModal={handleModal} />

      {openModal && isAdmin && (
        <AlertsAdminModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          mode={mode}
          selectedAlert={selectedAlert}
        />
      )}
    </table>
  );
};
