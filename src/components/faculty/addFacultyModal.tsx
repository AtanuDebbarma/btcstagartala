import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {ClipLoader} from 'react-spinners';
import {FacultyForm} from './facultyForm';
import {addFacultyMember} from '@/services/backend/facultyCRUD';
import {FacultyType} from '@/types/otherTypes';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
  facultyType: FacultyType;
}

export const AddFacultyModal = ({
  openModal,
  setOpenModal,
  onSuccess,
  facultyType,
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

  const handleSubmit = async (facultyData: any) => {
    setLoading(true);
    setErrorMessage('');

    const {success, message} = await addFacultyMember(
      {...facultyData, type: facultyType},
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
        className="relative flex max-h-[90vh] w-[90%] max-w-4xl flex-col items-center overflow-y-auto rounded-xl bg-white p-6 text-black shadow-lg">
        {!loading && !processSuccess && (
          <div className="w-full">
            <i
              onClick={handleClose}
              className="fa-solid fa-times absolute top-4 right-4 cursor-pointer text-gray-500 transition-transform duration-150 ease-in-out hover:text-black active:scale-90"></i>

            <h2 className="mb-6 text-center text-lg font-semibold">
              Add New Faculty Member
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
          <FacultyForm
            onSubmit={handleSubmit}
            onCancel={handleClose}
            loading={loading}
            errorMessage={errorMessage}
            mode="add"
          />
        )}
      </div>
    </div>
  );
};
