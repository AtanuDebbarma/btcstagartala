import React, {useEffect, useRef, useState} from 'react';
import {ClipLoader} from '@/components/Spinner';
import {DocumentModalForm} from './documentModalForm';

type DocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: any;
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
  | 'committee-cells';

interface Props {
  collectionType: CollectionType;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  mode: 'ADD' | 'EDIT' | 'DELETE';
  selectedDocument: DocumentType;
}

export const DocumentAdminModal = React.memo(
  ({
    collectionType,
    openModal,
    setOpenModal,
    mode,
    selectedDocument,
  }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [processSuccess, setProcessSuccess] = useState<boolean>(false);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (loading) {
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
    }, [openModal, loading, setOpenModal]);

    const handleClose = () => {
      if (loading) {
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
                  <h2 className="text-center text-lg font-semibold">
                    {mode} DOCUMENT
                  </h2>
                </div>
              )}
              {loading && (
                <div className="flex h-70 w-full items-center justify-center">
                  <ClipLoader
                    className="mt-5"
                    size={40}
                    color="#900090"
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
              {!loading && !processSuccess && (
                <div className="mt-6 w-full">
                  <DocumentModalForm
                    collectionType={
                      collectionType as
                        | 'aicte'
                        | 'iqac'
                        | 'dhe'
                        | 'academic-calendar'
                        | 'misc-documents'
                        | 'help-desk'
                        | 'aishe'
                        | 'committee-cells'
                    }
                    mode={mode}
                    setOpenModal={setOpenModal}
                    selectedDocument={selectedDocument}
                    setLoading={setLoading}
                    setProcessSuccess={setProcessSuccess}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    );
  },
);
