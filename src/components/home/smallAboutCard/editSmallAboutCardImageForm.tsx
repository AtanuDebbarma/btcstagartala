import {appStore} from '@/appStore/appStore';
import {handleEditImageUrl} from '@/helpers/textUpdateHelpers/genericTextHelpers';
import {SmallAboutCardimageType} from '@/types/homeTypes';
import React, {useState} from 'react';

type PropTypes = {
  selectedImage: SmallAboutCardimageType | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOnHoverImage: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditSmallAboutCardImageForm = ({
  selectedImage,
  setOpenModal,
  loading,
  setLoading,
  setProcessSuccess,
  setOnHoverImage,
}: PropTypes) => {
  const [newImageUrl, setNewImageUrl] = useState<string>(
    selectedImage?.url || '',
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const setSmallAboutCardImage = appStore(
    state => state.setSmallAboutCardImage,
  );

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImageUrl(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handleOnEdit = () => {
    setOnHoverImage(false);

    if (!newImageUrl || newImageUrl.trim() === '') {
      setLoading(false);
      setErrorMessage('Please enter an image URL!');
      setOnHoverImage(false);
      return;
    }

    if (newImageUrl === selectedImage?.url) {
      setLoading(false);
      setErrorMessage('No changes detected!');
      setOnHoverImage(false);
      return;
    }

    setTimeout(() => {
      handleEditImageUrl(
        setOpenModal,
        'TthcdPKX2bYBHqNuHarF',
        'smallAboutCard',
        newImageUrl,
        setLoading,
        handleErrorMessageUpdate,
        setProcessSuccess,
        setSmallAboutCardImage,
        selectedImage,
      );
    }, 200);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }
    setOnHoverImage(false);
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
          Edit Image URL
        </label>
        <input
          type="text"
          value={newImageUrl}
          onChange={handleUrlChange}
          disabled={loading}
          className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>

      {newImageUrl && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Preview:
          </label>
          <img
            src={newImageUrl}
            alt="Preview"
            className="mt-2 h-auto max-h-[200px] w-full rounded-md object-cover"
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none';
              setErrorMessage('Invalid image URL or image failed to load');
            }}
            onLoad={() => {
              (
                document.querySelector('img[alt="Preview"]') as HTMLImageElement
              ).style.display = 'block';
            }}
          />
        </div>
      )}

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
