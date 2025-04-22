import {deleteCarouselImage} from '@/services/carousel/carouselDelete';
import {addCarouselImage} from '@/services/carousel/createCarouselNewImage';
import {
  getImageDocByOrder,
  updateImageDoc,
} from '@/services/carousel/editCarouselImage';
import {updateCarouselDimensions} from '@/services/carousel/editDimentions';
import {Dimensions} from '@/services/carousel/fetchDimentions';
import {uploadCarouselToCloudinary} from '@/services/cloudinary/imageUpload';
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
  setUploadError: React.Dispatch<React.SetStateAction<string>>,
) => {
  setAutoPlay(false);
  setLoading(true);
  try {
    if (!tempImage) {
      setLoading(false);
      setUploading(false);
      setUploadError('Please select an image to upload.');
      return;
    }

    // Upload image to Cloudinary
    const {data} = await uploadCarouselToCloudinary(tempImage);

    if (!data || !data.secure_url) {
      setLoading(false);
      setUploading(false);
      setUploadError('Please select an image to upload.');
      return;
    }
    const updatedImage: CarouselImage = {
      ...formValues,
      imageUrl: data.secure_url,
    };

    const success = await addCarouselImage(updatedImage, setCarouselImages);

    if (success) {
      setLoading(false);
      setOpenModal(false);
      setAutoPlay(true);
      setUploading(false);
      setUploadError('');
    } else {
      setLoading(false);
      setOpenModal(false);
      setAutoPlay(true);
      setUploading(false);
      setUploadError('Failed to add image! Please check values and try again.');
    }
  } catch (err) {
    console.error('Error adding image:', err);
    alert('Failed to add image! Please check values and try again.');
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
    setUploading(false);
    setUploadError('');
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
  setUploadError: React.Dispatch<React.SetStateAction<string>>,
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
      setUploadError('No image found with this imageOrder');
      return;
    }
    if (!tempImage) {
      setLoading(false);
      setUploading(false);
      setUploadError('Please select an image to upload.');
      return;
    }

    // Upload image to Cloudinary
    const {data} = await uploadCarouselToCloudinary(tempImage);

    if (!data || !data.secure_url) {
      setLoading(false);
      setUploading(false);
      setUploadError('Please select an image to upload.');
      return;
    }
    const updatedImage: CarouselImage = {
      ...selectedImage,
      imageUrl: data.secure_url,
    };

    //Update the Firestore document
    const success = await updateImageDoc(result.ref, {
      imageUrl: updatedImage.imageUrl,
      imageOrder: updatedImage.imageOrder,
    });

    if (success) {
      //Update local state
      setCarouselImages(prev => {
        // Find and update the image in local state
        return prev.map(image =>
          image.imageOrder === updatedImage.imageOrder
            ? {...image, imageUrl: updatedImage.imageUrl}
            : image,
        );
      });
      setLoading(false);
      setOpenModal(false);
      setAutoPlay(true);
      setUploading(false);
      setUploadError('');
    } else {
      setLoading(false);
      setOpenModal(false);
      setAutoPlay(true);
      setUploading(false);
      setUploadError('Failed to add image! Please check values and try again.');
    }
  } catch (err) {
    console.error('Failed to update image:', err);
    alert('Failed to update image! Please check values and try again.');
    setLoading(false);
    setOpenModal(false);
    setAutoPlay(true);
    setUploading(false);
    setUploadError('');
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
