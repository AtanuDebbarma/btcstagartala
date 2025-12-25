import type {Dispatch, SetStateAction} from 'react';
import {useEffect, useRef, useState} from 'react';
import {ClipLoader} from '@/components/Spinner';
import {deleteFacultyMember} from '@/services/backend/facultyCRUD';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  facultyId: string;
  facultyName: string;
}

export const DeleteFacultyModal = ({
  openModal,
  setOpenModal,
  onSuccess,
  facultyId,
  facultyName,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [processSuccess, setProcessSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, loading]); // setOpenModal is stable

  const handleClose = () => {
    if (loading) {
      return;
    }
    setTimeout(() => {
      setOpenModal(false);
      setErrorMessage('');
    }, 200);
  };

  const handleDelete = async () => {
    setLoading(true);
    setErrorMessage('');

    const {success, message} = await deleteFacultyMember(
      facultyId,
      setErrorMessage,
    );

    if (success) {
      setProcessSuccess(true);
      setLoading(false);
      setTimeout(() => {
        onSuccess();
        setOpenModal(false);
        setProcessSuccess(false);
      }, 2000);
    } else {
      setLoading(false);
      setErrorMessage(message);
    }
  };

  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/30">
      <div
        ref={modalRef}
        className="relative flex w-[90%] max-w-md flex-col items-center rounded-xl bg-white p-6 text-black shadow-lg">
        {!loading && !processSuccess && (
          <div className="w-full">
            <i
              onClick={handleClose}
              className="fa-solid fa-times absolute top-4 right-4 cursor-pointer text-gray-500 transition-transform duration-150 ease-in-out hover:text-black active:scale-90"></i>

            <h2 className="mb-4 text-center text-lg font-semibold">
              Delete Faculty Member
            </h2>
            <p className="mb-6 text-center text-gray-700">
              Are you sure you want to delete{' '}
              <span className="font-bold">{facultyName}</span>? This action
              cannot be undone.
            </p>

            {errorMessage && (
              <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
            )}

            <div className="flex w-full justify-center space-x-4">
              <button
                onClick={handleClose}
                disabled={loading}
                className="cursor-pointer rounded-md bg-gray-300 px-6 py-2 text-gray-700 transition-transform duration-150 ease-in-out hover:bg-gray-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="cursor-pointer rounded-md bg-red-600 px-6 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-red-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
                Delete
              </button>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex h-40 w-full items-center justify-center">
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
              DELETED
            </h2>
            <p className="mt-5 text-4xl">✅</p>
          </div>
        )}
      </div>
    </div>
  );
};
