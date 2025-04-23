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
  setCarouselImages: React.Dispatch<React.SetStateAction<CarouselImage[]>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  tempImage: File | null,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAutoPlay(false);
  setLoading(true);
  try {
    if (!tempImage) {
      setLoading(false);
      setUploading(false);
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
      setLoading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');
      setUploading(false);
      setTimeout(() => {
        setOpenModal(false);
        setAutoPlay(true);
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
    console.error('Error adding image:', err);
    alert('Failed to add image! Please check values and try again.');
    setProcessSuccess(false);
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
    setUploading(false);
    handleUploadErrorMessage('');
  }
};

export const handleEdit = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedImage: CarouselImage,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCarouselImages: React.Dispatch<React.SetStateAction<CarouselImage[]>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  tempImage: File | null,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAutoPlay(false);
  setLoading(true);

  try {
    // Find the image document in Firestore by imageOrder
    const result = await getImageDocByOrder(selectedImage.imageOrder);
    if (!result) {
      alert('No image found with this imageOrder');
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('No image found with this imageOrder');
      return;
    }
    if (!tempImage) {
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('Please select an image to upload.');
      return;
    }

    // Upload image to Cloudinary
    const {success, asset} = await sendEditCarouselImageToBackend(
      selectedImage.image_public_id,
      tempImage,
      handleUploadErrorMessage,
    );

    if (!success || !asset.url) {
      setLoading(false);
      setUploading(false);
      return;
    }
    const updatedImage: CarouselImage = {
      ...selectedImage,
      imageUrl: asset.url,
      image_public_id: asset.public_id,
    };

    //Update the Firestore document
    const firebaseEditSuccess = await updateImageDoc(result.ref, {
      imageUrl: updatedImage.imageUrl,
      imageOrder: updatedImage.imageOrder,
      image_public_id: updatedImage.image_public_id,
    });

    if (firebaseEditSuccess) {
      setLoading(false);
      setProcessSuccess(true);
      setUploading(false);
      handleUploadErrorMessage('');
      //Update local state
      setCarouselImages(prev => {
        // Find and update the image in local state
        return prev.map(image =>
          image.imageOrder === updatedImage.imageOrder
            ? {...image, imageUrl: updatedImage.imageUrl}
            : image,
        );
      });
      setTimeout(() => {
        setOpenModal(false);
        setAutoPlay(true);
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
    setProcessSuccess(false);
    setOpenModal(false);
    setAutoPlay(true);
    setUploading(false);
    handleUploadErrorMessage('');
  }
};

export const handleDelete = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  imageToDelete: CarouselImage,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCarouselImages: React.Dispatch<React.SetStateAction<CarouselImage[]>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAutoPlay(false);
  setLoading(true);

  if (!imageToDelete) {
    setLoading(false);
    setUploading(false);
    handleUploadErrorMessage('No mage Selected!');
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
    setProcessSuccess(true);
    setUploading(false);
    handleUploadErrorMessage('');
    setTimeout(() => {
      setOpenModal(false);
      setAutoPlay(true);
    }, 2000);
  } catch (err) {
    console.error('Failed to delete image:', err);
    alert('Failed to delete image! Try again.');
    setLoading(false);
    setProcessSuccess(false);
    setOpenModal(false);
    setAutoPlay(true);
    setUploading(false);
    handleUploadErrorMessage('');
  }
};

export const handleDimUpdate = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  formValues: Dimensions,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setAutoPlay(false);
  setLoading(true);
  try {
    const success = await updateCarouselDimensions(formValues);
    if (success) {
      setDimensions(formValues);
      setProcessSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setOpenModal(false);
        setAutoPlay(true);
      }, 2000);
    }
  } catch (err) {
    console.error('Error adding image:', err);
    alert('Failed to add image! Please check values and try again.');
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
  }
};
