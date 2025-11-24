import {appStore} from '@/appStore/appStore';
import {handleEditText} from '@/helpers/textUpdateHelpers/genericTextHelpers';
import {SmallAboutCardType} from '@/types/homeTypes';
import React, {useState} from 'react';

type PropTypes = {
  selectedData: SmallAboutCardType | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOnHover: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditPrincipalTextForm = ({
  selectedData,
  setOpenModal,
  loading,
  setLoading,
  setProcessSuccess,
  setOnHover,
}: PropTypes) => {
  const [newText, setNewText] = useState<string>(selectedData?.text || '');
  const [boldFooter, setBoldFooter] = useState<string>(
    selectedData?.bold_footer || '',
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const setPrincipalText = appStore(state => state.setPrincipalText);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoldFooter(e.target.value);
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

    if (
      newText === selectedData?.text &&
      boldFooter === selectedData?.bold_footer
    ) {
      setLoading(false);
      setErrorMessage('No changes detected!');
      setOnHover(false);
      return;
    }

    setTimeout(() => {
      handleEditText(
        setOpenModal,
        'principal_text',
        'smallAboutCard',
        newText,
        boldFooter,
        setLoading,
        handleErrorMessageUpdate,
        setProcessSuccess,
        setPrincipalText,
        selectedData,
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
          className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter the principal message text..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="mt-2 block text-sm font-medium text-gray-700">
          Bold Footer Text
        </label>
        <input
          type="text"
          value={boldFooter}
          onChange={handleFooterChange}
          disabled={loading}
          className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Principal - Bhavan's Tripura College of Science & Technology"
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
