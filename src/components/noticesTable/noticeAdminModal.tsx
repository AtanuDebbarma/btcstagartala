import {appStore} from '@/appStore/appStore';
import {CarouselModeType, NoticeBoardType} from '@/types/homeTypes';
import React, {Dispatch, SetStateAction} from 'react';
import {useEffect, useRef, useState} from 'react';
import {ClipLoader} from 'react-spinners';
import {NoticeModalForm} from './noticeModalForm';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  mode: CarouselModeType;
  selectedNotice: NoticeBoardType;
}
export const NoticeAdminModal = React.memo(
  ({openModal, setOpenModal, mode, selectedNotice}: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [processSuccess, setProcessSuccess] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);

    const setNotices = appStore(state => state.setNotices);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (loading || uploading) {
          return;
        }
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          setOpenModal(false);
        }
      };

      if (openModal) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openModal, loading, uploading]); // setOpenModal is stable, no need to include

    const handleClose = () => {
      if (loading || uploading) {
        return;
      }
      setTimeout(() => {
        setOpenModal(false);
      }, 200);
    };

    return (
      <tbody>
        <tr>
          <td className="fixed inset-0 z-999999 flex items-center justify-center bg-black/30">
            <div
              ref={modalRef}
              className="relative flex w-[90%] max-w-md flex-col items-center rounded-xl bg-white p-6 text-black shadow-lg">
              {!loading && !processSuccess && (
                <div>
                  <i
                    onClick={handleClose}
                    className="fa-solid fa-times absolute top-4 right-4 cursor-pointer text-gray-500 transition-transform duration-150 ease-in-out hover:text-black active:scale-90"></i>
                  {mode !== 'DIM' && (
                    <h2 className="text-center text-lg font-semibold">
                      {mode} NOTICE
                    </h2>
                  )}
                </div>
              )}
              {loading && (
                <div className="flex h-70 w-full items-center justify-center">
                  <ClipLoader
                    className="mt-5"
                    size={40}
                    color="#1a3bdf"
                    loading={loading}
                  />
                </div>
              )}
              {processSuccess && (
                <div className="flex flex-col items-center justify-center">
                  <h2 className="mb-8 text-center text-4xl font-bold text-black">
                    SUCCESS
                  </h2>
                  <p className="mt-5 text-4xl">✅</p>
                </div>
              )}
              {(mode === 'ADD' || mode === 'EDIT' || mode === 'DELETE') &&
                !loading &&
                !processSuccess && (
                  <NoticeModalForm
                    mode={mode}
                    setOpenModal={setOpenModal}
                    selectedNotice={selectedNotice}
                    setNotices={setNotices}
                    loading={loading}
                    setLoading={setLoading}
                    uploading={uploading}
                    setUploading={setUploading}
                    setProcessSuccess={setProcessSuccess}
                  />
                )}
            </div>
          </td>
        </tr>
      </tbody>
    );
  },
);
