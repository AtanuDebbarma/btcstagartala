import {appStore} from '@/appStore/appStore';
import {handleEditText} from '@/helpers/textUpdateHelpers/genericTextHelpers';
import {SmallAboutCardType} from '@/types/homeTypes';
import React, {useState} from 'react';

type PropTypes = {
  selectedCard: SmallAboutCardType | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOnHover: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditSmallAboutCardForm = ({
  selectedCard,
  setOpenModal,
  loading,
  setLoading,
  setProcessSuccess,
  setOnHover,
}: PropTypes) => {
  const [newText, setNewText] = useState<string>(selectedCard?.text || '');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const setSmallAboutCard = appStore(state => state.setSmallAboutCard);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handleOnEdit = () => {
    setOnHover(false);

    if (!newText || newText.trim() === '') {
      setLoading(false);
      setErrorMessage('Please enter some text!');
      setOnHover(false);
      return;
    }

    if (newText === selectedCard?.text) {
      setLoading(false);
      setErrorMessage('No changes detected!');
      setOnHover(false);
      return;
    }

    setTimeout(() => {
      handleEditText(
        setOpenModal,
        'gy7JOSioCyirk8KNeSmX',
        'smallAboutCard',
        newText,
        undefined, // No bold_footer for smallAboutCard
        setLoading,
        handleErrorMessageUpdate,
        setProcessSuccess,
        setSmallAboutCard,
        selectedCard,
      );
    }, 200);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }
    setOnHover(false);
    setTimeout(() => {
      setOpenModal(false);
    }, 200);
  };

  const handleErrorMessageUpdate = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-1">
        <label className="mt-2 block text-sm font-medium text-gray-700">
          Edit Text Content
        </label>
        <textarea
          value={newText}
          onChange={handleTextChange}
          disabled={loading}
          rows={12}
          className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-purple-700 focus:ring-purple-500"
          placeholder="Enter the about card text..."
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleClose}
          disabled={loading}
          className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-150 ease-in-out hover:bg-gray-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          Cancel
        </button>
        <button
          onClick={handleOnEdit}
          disabled={loading}
          className="cursor-pointer rounded-md bg-[#900090] px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-purple-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          Update
        </button>
      </div>
    </div>
  );
};
