import {
  handleAdd,
  handleDelete,
  handleEdit,
} from '@/helpers/carouselHelpers/carouselUpdateHelpers';
import {CarouselImage, CarouselModeType} from '@/types/homeTypes';
import React, {useState} from 'react';

type PropTypes = {
  mode: CarouselModeType;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: CarouselImage;
  totalCount: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCarouselImages: React.Dispatch<React.SetStateAction<CarouselImage[]>>;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ImageForm = ({
  mode,
  setOpenModal,
  selectedImage,
  totalCount,
  setLoading,
  setCarouselImages,
  setAutoPlay,
}: PropTypes) => {
  const [formValues, setFormValues] = useState<CarouselImage>({
    id: selectedImage.id,
    imageUrl: mode === 'ADD' ? '' : selectedImage.imageUrl,
    createdAt: mode === 'ADD' ? null : selectedImage.createdAt,
    imageOrder: mode === 'ADD' ? totalCount + 1 : selectedImage.imageOrder || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: name === 'imageOrder' ? parseInt(value) : value,
    }));
  };
  const handleOnAdd = () => {
    handleAdd(
      setOpenModal,
      formValues,
      setLoading,
      setCarouselImages,
      setAutoPlay,
    );
  };
  const handleOnEdit = () => {
    handleEdit(
      setOpenModal,
      formValues,
      setLoading,
      setCarouselImages,
      setAutoPlay,
    );
  };
  const handleOnDelete = () => {
    handleDelete(
      setOpenModal,
      formValues,
      setLoading,
      setCarouselImages,
      setAutoPlay,
    );
  };

  const handleClose = () => {
    setAutoPlay(true);
    setOpenModal(false);
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
          className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500">
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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          disabled={mode === 'DELETE' && true}
          type="text"
          name="imageUrl"
          value={formValues.imageUrl}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter image URL"
        />
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleClose}
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
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
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {mode === 'ADD' ? 'Add' : mode === 'EDIT' ? 'Update' : 'Delete'}
        </button>
      </div>
    </div>
  );
};
