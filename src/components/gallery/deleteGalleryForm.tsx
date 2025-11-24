import {handleDeleteGalleryImage} from '@/helpers/galleryHelpers/galleryHelpers';
import {GalleryImageType} from '@/types/galleryTypes';
import React, {useState} from 'react';

type PropTypes = {
  selectedImage: GalleryImageType | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteGalleryForm = ({
  selectedImage,
  setOpenModal,
  uploading,
  setUploading,
  loading,
  setLoading,
  setProcessSuccess,
}: PropTypes) => {
  const [uploadError, setUploadError] = useState<string>('');

  const handleOnDelete = () => {
    setTimeout(() => {
      handleDeleteGalleryImage(
        setOpenModal,
        selectedImage,
        setLoading,
        setUploading,
        handleUploadErrorMessage,
        setProcessSuccess,
      );
    }, 200);
  };

  const handleClose = () => {
    if (loading || uploading) {
      return;
    }
    setTimeout(() => {
      setOpenModal(false);
    }, 200);
  };

  const handleUploadErrorMessage = (message: string) => {
    setUploadError(message);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <p className="text-gray-700">
          Are you sure you want to delete this image?
        </p>
        {selectedImage && (
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">
              Title: {selectedImage.title}
            </p>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="mt-2 h-32 w-32 rounded-md object-cover"
            />
          </div>
        )}
        {uploadError && (
          <p className="mt-1 text-sm text-red-500">{uploadError}</p>
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleClose}
          className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-150 ease-in-out hover:bg-gray-400 active:scale-95">
          Cancel
        </button>
        <button
          onClick={handleOnDelete}
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-red-700 active:scale-95">
          Delete
        </button>
      </div>
    </div>
  );
};
