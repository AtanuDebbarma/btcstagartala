import type {GalleryImageType} from '@/types/galleryTypes';
import React, {useState} from 'react';
import {AddGalleryForm} from './addGalleryForm';
import {EditGalleryForm} from './editGalleryForm';
import {DeleteGalleryForm} from './deleteGalleryForm';

type PropTypes = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: GalleryImageType | null;
  mode: 'ADD' | 'EDIT' | 'DELETE';
  totalCount: number;
};

export const GalleryModal = ({
  openModal,
  setOpenModal,
  selectedImage,
  mode,
  totalCount,
}: PropTypes) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [processSuccess, setProcessSuccess] = useState<boolean>(false);

  const getTitle = () => {
    if (mode === 'ADD') return 'Add Gallery Image';
    if (mode === 'EDIT') return 'Edit Gallery Image';
    return 'Delete Gallery Image';
  };

  if (!openModal) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">{getTitle()}</h2>

        {loading && (
          <div className="mb-4 text-center text-blue-600">Processing...</div>
        )}
        {uploading && (
          <div className="mb-4 text-center text-blue-600">Uploading...</div>
        )}
        {processSuccess && (
          <div className="mb-4 text-center text-green-600">Success! ✓</div>
        )}

        {mode === 'ADD' && (
          <AddGalleryForm
            setOpenModal={setOpenModal}
            totalCount={totalCount}
            uploading={uploading}
            setUploading={setUploading}
            loading={loading}
            setLoading={setLoading}
            setProcessSuccess={setProcessSuccess}
          />
        )}
        {mode === 'EDIT' && (
          <EditGalleryForm
            selectedImage={selectedImage}
            setOpenModal={setOpenModal}
            uploading={uploading}
            setUploading={setUploading}
            loading={loading}
            setLoading={setLoading}
            setProcessSuccess={setProcessSuccess}
          />
        )}
        {mode === 'DELETE' && (
          <DeleteGalleryForm
            selectedImage={selectedImage}
            setOpenModal={setOpenModal}
            uploading={uploading}
            setUploading={setUploading}
            loading={loading}
            setLoading={setLoading}
            setProcessSuccess={setProcessSuccess}
          />
        )}
      </div>
    </div>
  );
};
