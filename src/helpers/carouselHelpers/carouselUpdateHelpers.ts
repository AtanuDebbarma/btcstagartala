import {deleteCarouselImage} from '@/services/carousel/carouselDelete';
import {addCarouselImage} from '@/services/carousel/createCarouselNewImage';
import {
  getImageDocByOrder,
  updateImageDoc,
} from '@/services/carousel/editCarouselImage';
import {updateCarouselDimensions} from '@/services/carousel/editDimentions';
import {Dimensions} from '@/services/carousel/fetchDimentions';
import {CarouselImage} from '@/types/homeTypes';
import React from 'react';

export const handleAdd = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  formValues: CarouselImage,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCarouselImages: React.Dispatch<React.SetStateAction<CarouselImage[]>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAutoPlay(false);
  setLoading(true);
  try {
    await addCarouselImage(formValues, setCarouselImages);
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  } catch (err) {
    console.error('Error adding image:', err);
    alert('Failed to add image! Please check values and try again.');
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  }
};

export const handleEdit = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedImage: CarouselImage,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCarouselImages: React.Dispatch<React.SetStateAction<CarouselImage[]>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAutoPlay(false);
  setLoading(true);

  try {
    // Step 1: Find the image document in Firestore by imageOrder
    const result = await getImageDocByOrder(selectedImage.imageOrder);
    if (!result) throw new Error('No image found with this imageOrder');

    // Step 2: Update the Firestore document
    await updateImageDoc(result.ref, {
      imageUrl: selectedImage.imageUrl,
      imageOrder: selectedImage.imageOrder,
    });

    // Step 3: Update local state
    setCarouselImages(prev => {
      // Find and update the image in local state
      return prev.map(image =>
        image.imageOrder === selectedImage.imageOrder
          ? {...image, imageUrl: selectedImage.imageUrl}
          : image,
      );
    });

    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  } catch (err) {
    console.error('Failed to update image:', err);
    alert('Failed to update image! Please check values and try again.');
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  }
};

export const handleDelete = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  imageToDelete: CarouselImage,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCarouselImages: React.Dispatch<React.SetStateAction<CarouselImage[]>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAutoPlay(false);
  setLoading(true);

  try {
    await deleteCarouselImage(imageToDelete.imageOrder);

    setCarouselImages(prev => {
      // Step 1: Filter out the deleted image
      const filtered = prev.filter(
        img => img.imageOrder !== imageToDelete.imageOrder,
      );

      // Step 2: Shift imageOrder for remaining images (never below 1)
      const updated = filtered.map(img => {
        if (img.imageOrder > imageToDelete.imageOrder) {
          return {
            ...img,
            imageOrder: Math.max(img.imageOrder - 1, 1),
          };
        }
        return img;
      });

      return updated;
    });

    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  } catch (err) {
    console.error('Failed to delete image:', err);
    alert('Failed to delete image! Try again.');
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  }
};

export const handleDimUpdate = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  formValues: Dimensions,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  let success = false;
  setAutoPlay(false);
  setLoading(true);
  try {
    success = await updateCarouselDimensions(formValues);
    if (success) {
      setDimensions(formValues);
      setLoading(false);
      setOpenModal(false);
      setAutoPlay(true);
    }
  } catch (err) {
    console.error('Error adding image:', err);
    alert('Failed to add image! Please check values and try again.');
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  }
};
