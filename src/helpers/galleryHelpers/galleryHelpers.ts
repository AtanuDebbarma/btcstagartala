import {
  addGalleryImageBackend,
  deleteGalleryImageBackend,
  updateGalleryImageBackend,
} from '@/services/gallery/galleryBackend';
import type {GalleryImageType} from '@/types/galleryTypes';
import {Timestamp} from 'firebase/firestore';
import type React from 'react';

const MAX_GALLERY_IMAGES = 200;

/**
 * Handle adding new gallery image
 */
export const handleAddGalleryImage = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  url: string,
  title: string,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  totalCount: number,
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    // Check max limit
    if (totalCount >= MAX_GALLERY_IMAGES) {
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage(
        `Maximum ${MAX_GALLERY_IMAGES} images allowed. Please delete oldest image to add new one.`,
      );
      return;
    }

    if (!url.trim()) {
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('Please enter an image URL.');
      return;
    }

    if (!title.trim()) {
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('Please enter an image title.');
      return;
    }

    // Use current timestamp
    const timestamp = Timestamp.now();
    // Use negative timestamp for descending order (newest first by default)
    const order = -timestamp.toMillis();

    // Add to Firestore via backend
    const result = await addGalleryImageBackend(
      url.trim(),
      title.trim(),
      timestamp,
      order,
      handleUploadErrorMessage,
    );

    if (result.success) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');

      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('Failed to add image! Please try again.');
    }
  } catch (err) {
    console.error('[Gallery] Failed to add image:', err);
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage('Failed to add image! Please try again.');
    setOpenModal(false);
  }
};

/**
 * Handle editing gallery image
 */
export const handleEditGalleryImage = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedImage: GalleryImageType | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  url: string,
  title: string,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    if (!selectedImage) {
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('No image selected!');
      return;
    }

    if (!url.trim()) {
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('Please enter an image URL.');
      return;
    }

    if (!title.trim()) {
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('Please enter an image title.');
      return;
    }

    // Update via backend (no need to get document reference)
    const firebaseSuccess = await updateGalleryImageBackend(
      selectedImage.id,
      {
        url: url.trim(),
        title: title.trim(),
      },
      handleUploadErrorMessage,
    );

    if (firebaseSuccess) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');

      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('Failed to update image! Please try again.');
    }
  } catch (err) {
    console.error('[Gallery] Failed to update image:', err);
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage('Failed to update image! Please try again.');
    setOpenModal(false);
  }
};

/**
 * Handle deleting gallery image
 */
export const handleDeleteGalleryImage = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedImage: GalleryImageType | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    if (!selectedImage) {
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('No image selected!');
      return;
    }

    // Delete from Firestore via backend
    const firebaseSuccess = await deleteGalleryImageBackend(
      selectedImage.id,
      handleUploadErrorMessage,
    );

    if (firebaseSuccess) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');

      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage('Failed to delete image! Please try again.');
    }
  } catch (err) {
    console.error('[Gallery] Failed to delete image:', err);
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage('Failed to delete image! Please try again.');
    setOpenModal(false);
  }
};
