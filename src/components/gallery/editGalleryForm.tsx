import {handleEditGalleryImage} from '@/helpers/galleryHelpers/galleryHelpers';
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

export const EditGalleryForm = ({
  selectedImage,
  setOpenModal,
  uploading,
  setUploading,
  loading,
  setLoading,
  setProcessSuccess,
}: PropTypes) => {
  const [uploadError, setUploadError] = useState<string>('');
  const [url, setUrl] = useState<string>(selectedImage?.url || '');
  const [title, setTitle] = useState<string>(selectedImage?.title || '');
  const [date, setDate] = useState<string>(() => {
    if (selectedImage?.createdAt) {
      const timestamp = selectedImage.createdAt.toDate();
      return timestamp.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });

  const handleOnEdit = () => {
    if (!url.trim()) {
      setUploading(false);
      setLoading(false);
      setUploadError('Please enter an image URL!');
      return;
    }
    if (!title.trim()) {
      setUploading(false);
      setLoading(false);
      setUploadError('Please enter an image title!');
      return;
    }
    if (!date) {
      setUploading(false);
      setLoading(false);
      setUploadError('Please select a date!');
      return;
    }
    setTimeout(() => {
      handleEditGalleryImage(
        setOpenModal,
        selectedImage,
        setLoading,
        url,
        title,
        date,
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
      <div className="flex flex-col gap-1">
        <label className="mt-2 block text-sm font-medium text-gray-700">
          Image Title
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter image title"
          disabled={uploading}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        <label className="mt-2 block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter image URL"
          disabled={uploading}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        <label className="mt-2 block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          disabled={uploading}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        {uploading && (
          <p className="mt-1 text-sm text-blue-600">Processing...</p>
        )}
        {uploadError && (
          <p className="mt-1 text-sm text-red-500">{uploadError}</p>
        )}
      </div>

      {url && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Preview
          </label>
          <img
            src={url}
            alt="Preview"
            className="mt-2 h-32 w-32 rounded-md object-cover"
            onError={() => setUploadError('Invalid image URL')}
          />
        </div>
      )}

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleClose}
          disabled={loading || uploading}
          className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-150 ease-in-out hover:bg-gray-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          Cancel
        </button>
        <button
          onClick={handleOnEdit}
          disabled={loading || uploading}
          className="cursor-pointer rounded-md bg-[#900090] px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-purple-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          {loading || uploading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
};
