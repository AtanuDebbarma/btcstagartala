import {appStore} from '@/appStore/appStore';
import {deleteCarouselImage} from '@/services/carousel/carouselDelete';
import {addCarouselImage} from '@/services/carousel/createCarouselNewImage';
import {
  getImageDocByOrder,
  updateImageDoc,
} from '@/services/carousel/editCarouselImage';
import {updateCarouselDimensions} from '@/services/carousel/editDimentions';
import {Dimensions} from '@/services/carousel/fetchDimentions';
import {
  sendAddCarouselImageToBackend,
  sendDeleteCarouselImageToBackend,
  sendEditCarouselImageToBackend,
} from '@/services/cloudinary/sendtoBackend';
import {CarouselImage} from '@/types/homeTypes';
import React from 'react';

export const handleAdd = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  formValues: CarouselImage,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  tempImage: File | null,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setCarouselImages: (carouselImages: CarouselImage[] | []) => Promise<void>,
) => {
  setAutoPlay(false);
  setLoading(true);
  setProcessSuccess(false);
  try {
    if (!tempImage) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Please select an image to upload.');
      return;
    }

    // Upload image to Cloudinary
    const {success, asset} = await sendAddCarouselImageToBackend(
      tempImage,
      handleUploadErrorMessage,
    );

    if (!success || !asset.url) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      return;
    }
    const updatedImage: CarouselImage = {
      ...formValues,
      imageUrl: asset.url,
      image_public_id: asset.public_id,
    };

    const firebaseAddSuccess = await addCarouselImage(
      updatedImage,
      setCarouselImages,
    );

    if (firebaseAddSuccess) {
      setUploading(false);
      setLoading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');
      setTimeout(() => {
        setAutoPlay(true);
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setUploading(false);
      handleUploadErrorMessage(
        'Failed to add image! Please check values and try again.',
      );
      setLoading(false);
      setAutoPlay(false);
      return;
    }
  } catch (err) {
    console.error('Error adding image:', err);
    alert('Failed to add image! Please check values and try again.');
    setProcessSuccess(false);
    handleUploadErrorMessage('');
    setUploading(false);
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  }
};
export const handleEdit = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedImage: CarouselImage,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  tempImage: File | null,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setCarouselImages: (carouselImages: CarouselImage[] | []) => Promise<void>,
) => {
  const {carouselImages} = appStore.getState();

  setAutoPlay(false);
  setLoading(true);
  setProcessSuccess(false);

  try {
    const result = await getImageDocByOrder(selectedImage.imageOrder);
    if (!result) {
      alert('No image found with this imageOrder');
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No image found with this imageOrder');
      return;
    }

    if (!tempImage) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Please select an image to upload.');
      return;
    }

    const {success, asset} = await sendEditCarouselImageToBackend(
      selectedImage.image_public_id,
      tempImage,
      handleUploadErrorMessage,
    );

    if (!success || !asset.url) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      return;
    }

    const updatedImage: CarouselImage = {
      ...selectedImage,
      imageUrl: asset.url,
      image_public_id: asset.public_id,
    };

    const firebaseEditSuccess = await updateImageDoc(result.ref, {
      imageUrl: updatedImage.imageUrl,
      imageOrder: updatedImage.imageOrder,
      image_public_id: updatedImage.image_public_id,
    });

    if (firebaseEditSuccess) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');

      // ✅ Update Zustand store
      const updatedState = (carouselImages ?? []).map(image =>
        image.imageOrder === updatedImage.imageOrder
          ? {...image, imageUrl: updatedImage.imageUrl}
          : image,
      );

      await setCarouselImages(updatedState);

      setTimeout(() => {
        setAutoPlay(true);
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setLoading(false);
      setAutoPlay(false);
      setUploading(false);
      handleUploadErrorMessage(
        'Failed to add image! Please check values and try again.',
      );
      return;
    }
  } catch (err) {
    console.error('Failed to update image:', err);
    alert('Failed to update image! Please check values and try again.');
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage('');
    setOpenModal(false);
    setAutoPlay(true);
  }
};

export const handleDelete = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  imageToDelete: CarouselImage,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setCarouselImages: (carouselImages: CarouselImage[] | []) => Promise<void>,
) => {
  const {carouselImages} = appStore.getState();

  setAutoPlay(false);
  setLoading(true);
  setProcessSuccess(false);

  if (!imageToDelete) {
    setLoading(false);
    setUploading(false);
    handleUploadErrorMessage('No image selected!');
    setProcessSuccess(false);
    return;
  }

  const {success} = await sendDeleteCarouselImageToBackend(
    imageToDelete.image_public_id,
    handleUploadErrorMessage,
  );

  if (!success) {
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    return;
  }

  try {
    await deleteCarouselImage(imageToDelete.imageOrder);

    // ✅ Update Zustand state
    const filtered = (carouselImages ?? []).filter(
      img => img.imageOrder !== imageToDelete.imageOrder,
    );

    const updated = filtered.map(img => {
      if (img.imageOrder > imageToDelete.imageOrder) {
        return {
          ...img,
          imageOrder: Math.max(img.imageOrder - 1, 1),
        };
      }
      return img;
    });

    await setCarouselImages(updated);

    setLoading(false);
    setUploading(false);
    setProcessSuccess(true);
    handleUploadErrorMessage('');

    setTimeout(() => {
      setAutoPlay(true);
      setOpenModal(false);
    }, 2000);
  } catch (err) {
    console.error('Failed to delete image:', err);
    alert('Failed to delete image! Try again.');
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage('');
    setOpenModal(false);
    setAutoPlay(true);
  }
};

export const handleDimUpdate = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  formValues: Dimensions,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDimensions: (dimensions: Dimensions | null) => Promise<void>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAutoPlay(false);
  setLoading(true);
  setProcessSuccess(false);
  try {
    const success = await updateCarouselDimensions(formValues);
    if (success) {
      await setDimensions(formValues);
      setLoading(false);
      setProcessSuccess(true);
      setTimeout(() => {
        setAutoPlay(true);
        setOpenModal(false);
      }, 2000);
    }
  } catch (err) {
    console.error('Error adding image:', err);
    alert('Failed to add image! Please check values and try again.');
    setLoading(false);
    setProcessSuccess(false);
    setAutoPlay(true);
    setOpenModal(false);
  }
};
