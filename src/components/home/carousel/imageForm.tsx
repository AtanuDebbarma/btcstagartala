import {
  handleAdd,
  handleDelete,
  handleEdit,
} from '@/helpers/carouselHelpers/carouselUpdateHelpers';
import type {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import {validateImageFileType} from '@/utils/fileValidation';
import React, {useEffect, useRef, useState} from 'react';

type PropTypes = {
  mode: CarouselModeType;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: CarouselImage;
  totalCount: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setCarouselImages: (carouselImages: CarouselImage[] | []) => Promise<void>;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ImageForm = React.memo(
  ({
    mode,
    setOpenModal,
    selectedImage,
    totalCount,
    loading,
    setLoading,
    uploading,
    setUploading,
    setCarouselImages,
    setAutoPlay,
    setProcessSuccess,
  }: PropTypes) => {
    const [formValues, setFormValues] = useState<CarouselImage>({
      id: selectedImage.id,
      imageUrl: mode === 'ADD' ? '' : selectedImage.imageUrl,
      imageOrder:
        mode === 'ADD' ? totalCount + 1 : selectedImage.imageOrder || 0,
      image_public_id: mode === 'ADD' ? '' : selectedImage.image_public_id,
      createdAt: mode === 'ADD' ? null : selectedImage.createdAt,
    });
    const [uploadError, setUploadError] = useState<string>('');
    const [tempImage, setTempImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      const {name, value} = e.target;
      setFormValues(prev => ({
        ...prev,
        [name]: name === 'imageOrder' ? parseInt(value) : value,
      }));
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const {error} = validateImageFileType(file);
      if (error) {
        setUploadError(
          'Only image files (.jpg, .png, webp, .jpeg, .bmp) are allowed.',
        );
        return;
      } else {
        setTempImage(file);
        setUploadError('');
      }
    };

    useEffect(() => {
      if (tempImage) {
        const imageURL = URL.createObjectURL(tempImage);

        // Cleanup
        return () => {
          URL.revokeObjectURL(imageURL);
        };
      }
    }, [tempImage]);

    const handleOnAdd = () => {
      if (totalCount >= 15 && selectedImage.imageOrder >= 16) {
        setUploading(false);
        setLoading(false);
        setUploadError('Maximum 15 images allowed');
        return;
      }
      if (!tempImage) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please select an image!');
        return;
      }
      setTimeout(() => {
        void handleAdd(
          setOpenModal,
          formValues,
          setLoading,
          setAutoPlay,
          tempImage,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          setCarouselImages,
        );
      }, 200);
    };
    const handleOnEdit = () => {
      if (totalCount === 15 && selectedImage.imageOrder >= 16) {
        setUploading(false);
        setLoading(false);
        setUploadError('Maximum 15 images allowed');
        return;
      }
      if (!tempImage) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please select an image!');
        return;
      }
      setTimeout(() => {
        void handleEdit(
          setOpenModal,
          formValues,
          setLoading,
          setAutoPlay,
          tempImage,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          setCarouselImages,
        );
      }, 200);
    };
    const handleOnDelete = () => {
      if (totalCount <= 1) {
        setUploading(false);
        setLoading(false);
        handleUploadErrorMessage(
          'Cannot Delete!!. At least one image is required. Edit Image instead',
        );
        return;
      }
      setTimeout(() => {
        void handleDelete(
          setOpenModal,
          formValues,
          setLoading,
          setAutoPlay,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          setCarouselImages,
        );
      }, 200);
    };
    const handleClose = () => {
      if (loading || uploading) {
        return;
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setAutoPlay(true);
      setTempImage(null);
      setTimeout(() => {
        setOpenModal(false);
      }, 200);
    };

    const handleUploadErrorMessage = (message: string) => {
      setUploadError(message);
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Order
          </label>
          <select
            name="imageOrder"
            value={formValues.imageOrder}
            onChange={handleChange}
            disabled={mode !== 'ADD'}
            className="mt-1 w-full cursor-pointer rounded-md border border-gray-300 p-2 shadow-sm hover:bg-gray-300 focus:border-blue-500 focus:ring-blue-500">
            {[...Array(totalCount + 1)].map((_, i) => {
              const order = i + 1;
              const isAddNew = order === totalCount + 1;
              return (
                <option key={order} value={order}>
                  {isAddNew ? `${order} - (Add New)` : `${order}`}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            {mode === 'ADD'
              ? 'Select Image'
              : mode === 'EDIT'
                ? 'Edit Image'
                : 'Delete Image'}
          </label>
          {mode !== 'DELETE' && (
            <>
              <label
                htmlFor="file-upload"
                className="mt-1 h-full w-full cursor-pointer rounded-md border border-gray-300 p-2 shadow-sm transition-transform duration-180 ease-in-out hover:bg-gray-300 active:scale-95">
                Upload Image
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </>
          )}
          {uploading && (
            <p className="mt-1 text-sm text-blue-600">Uploading...</p>
          )}
          {uploadError && (
            <p className="mt-1 text-sm text-red-500">{uploadError}</p>
          )}
          {(tempImage || mode === 'DELETE' || mode === 'EDIT') && (
            <div className="relative mt-2 inline-block max-h-48">
              <img
                src={
                  tempImage
                    ? URL.createObjectURL(tempImage)
                    : mode === 'DELETE' || mode === 'EDIT'
                      ? selectedImage.imageUrl
                      : ''
                }
                alt="Preview"
                className="max-h-48 rounded-md object-contain shadow-md"
              />

              {tempImage && (
                <i
                  onClick={() => {
                    setTempImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''; // Reset file input value
                    }
                  }}
                  className="fa-solid fa-times absolute top-1 right-1 cursor-pointer text-gray-100 hover:text-red-500"></i>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-180 ease-in-out hover:bg-gray-400 active:scale-95">
            Cancel
          </button>
          <button
            onClick={
              mode === 'ADD'
                ? handleOnAdd
                : mode === 'EDIT'
                  ? handleOnEdit
                  : handleOnDelete
            }
            className="cursor-pointer rounded-md bg-[#900090] px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-blue-500 active:scale-95">
            {mode === 'ADD' ? 'Add' : mode === 'EDIT' ? 'Update' : 'Delete'}
          </button>
        </div>
      </div>
    );
  },
);
