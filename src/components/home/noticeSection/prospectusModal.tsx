import type {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import type {Dispatch, SetStateAction} from 'react';
import {useEffect, useRef, useState} from 'react';
import {ClipLoader} from '@/components/Spinner';
import {EditProspectusForm} from './editProspectusForm';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  selectedPDF: ProspectusAndAdmissionFormType | null;
  totalCount: number;
  setOnHoverProspectus: Dispatch<SetStateAction<boolean>>;
  setOnHoverAdmission: Dispatch<SetStateAction<boolean>>;
}
export const ProspectusModal = ({
  openModal,
  setOpenModal,
  selectedPDF,
  totalCount,
  setOnHoverProspectus,
  setOnHoverAdmission,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [processSuccess, setProcessSuccess] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

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
        setOnHoverProspectus(false);
        setOnHoverAdmission(false);
      }
    };

    if (openModal) {
      document.addEventListener('mousedown', handleClickOutside);
      setOnHoverProspectus(false);
      setOnHoverAdmission(false);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, loading, uploading]); // setState functions are stable

  const handleClose = () => {
    if (loading || uploading) {
      return;
    }
    setOnHoverProspectus(false);
    setOnHoverAdmission(false);
    setTimeout(() => {
      setOpenModal(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/30">
      <div
        ref={modalRef}
        className="relative flex w-[90%] max-w-md flex-col items-center rounded-xl bg-white p-6 text-black shadow-lg">
        {!loading && !processSuccess && (
          <div>
            <i
              onClick={handleClose}
              className="fa-solid fa-times absolute top-4 right-4 cursor-pointer text-gray-500 transition-transform duration-150 ease-in-out hover:text-black active:scale-90"></i>

            <h2 className="text-center text-lg font-semibold">
              Edit {selectedPDF?.name}
            </h2>
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
        {!loading && !processSuccess && (
          <EditProspectusForm
            selectedPDF={selectedPDF}
            setOpenModal={setOpenModal}
            totalCount={totalCount}
            uploading={uploading}
            setUploading={setUploading}
            loading={loading}
            setLoading={setLoading}
            setProcessSuccess={setProcessSuccess}
            setOnHoverProspectus={setOnHoverProspectus}
            setOnHoverAdmission={setOnHoverAdmission}
          />
        )}
      </div>
    </div>
  );
};
