import type {GalleryImageType} from '@/types/galleryTypes';
import React, {useState, useRef} from 'react';
import {updateGalleryImagesOrder} from '@/services/gallery/galleryFirebase';

type PropTypes = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  images: GalleryImageType[];
  onSuccess: () => void;
};

export const ReorderGalleryModal = ({
  openModal,
  setOpenModal,
  images,
  onSuccess,
}: PropTypes) => {
  const [orderedImages, setOrderedImages] =
    useState<GalleryImageType[]>(images);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newImages = [...orderedImages];
      const draggedItemContent = newImages[dragItem.current];
      newImages.splice(dragItem.current, 1);
      newImages.splice(dragOverItem.current, 0, draggedItemContent);
      setOrderedImages(newImages);
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggedIndex(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);

    // Calculate new order values based on position
    const updates = orderedImages.map((image, index) => ({
      id: image.id,
      order: index,
    }));

    const result = await updateGalleryImagesOrder(updates);

    if (result) {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        onSuccess();
        setOpenModal(false);
      }, 1500);
    } else {
      setLoading(false);
      alert('Failed to update order. Please try again.');
    }
  };

  const handleClose = () => {
    if (loading) return;
    setOrderedImages(images);
    setOpenModal(false);
  };

  if (!openModal) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Reorder Gallery Images
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Drag and drop images to reorder them on this page
        </p>

        {loading && (
          <div className="mb-4 text-center text-blue-600">Saving...</div>
        )}
        {success && (
          <div className="mb-4 text-center text-green-600">
            Order updated successfully! ✓
          </div>
        )}

        <div className="mb-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {orderedImages.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={e => e.preventDefault()}
                className={`relative cursor-move rounded-lg border-2 transition-all ${
                  draggedIndex === index
                    ? 'border-purple-500 opacity-50'
                    : 'border-gray-300 hover:border-purple-400'
                }`}>
                <div className="absolute top-1 left-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                  {index + 1}
                </div>
                <img
                  src={image.url}
                  alt={image.title}
                  className="h-24 w-full rounded-lg object-cover"
                />
                <p className="mt-1 truncate px-1 text-center text-xs text-gray-700">
                  {image.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleClose}
            disabled={loading}
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-150 ease-in-out hover:bg-gray-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="cursor-pointer rounded-md bg-[#900090] px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-purple-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      </div>
    </div>
  );
};
