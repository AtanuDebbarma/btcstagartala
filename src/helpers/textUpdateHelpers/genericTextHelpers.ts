import type {
  SmallAboutCardType,
  SmallAboutCardimageType,
} from '@/types/homeTypes';
import type React from 'react';
import {
  getTextDocByID,
  updateTextDoc,
} from '@/services/textServices/editTextFirebase';
import {sendTextToBackend} from '@/services/backend/sendTextToBackend';

/**
 * Generic function to handle text updates (with optional bold_footer)
 */
export const handleEditText = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  docId: string,
  collectionName: string,
  newText: string,
  boldFooter: string | undefined,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  updateStoreFunction: (data: SmallAboutCardType | null) => Promise<void>,
  currentData: SmallAboutCardType | null,
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    if (!currentData) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('No data found!');
      return;
    }

    if (!newText || newText.trim() === '') {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('Please enter some text.');
      return;
    }

    const result = await getTextDocByID(collectionName, docId);

    if (!result) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('No document found');
      return;
    }

    // Send to backend for authentication check
    const {success, message} = await sendTextToBackend(
      docId,
      newText,
      handleErrorMessage,
    );

    if (!success) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage(message || 'Failed to update text');
      return;
    }

    // Prepare update fields
    const updateFields: any = {text: newText};
    if (boldFooter !== undefined) {
      updateFields.bold_footer = boldFooter;
    }

    // Update Firestore
    const firebaseEditSuccess = await updateTextDoc(result.ref, updateFields);

    if (firebaseEditSuccess) {
      // Update Zustand store
      const updatedData: SmallAboutCardType = {
        ...currentData,
        text: newText,
        ...(boldFooter !== undefined && {bold_footer: boldFooter}),
      };
      await updateStoreFunction(updatedData);

      setLoading(false);
      setProcessSuccess(true);
      handleErrorMessage('');

      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setLoading(false);
      handleErrorMessage('Failed to update text! Please try again.');
      return;
    }
  } catch (err) {
    console.error('Failed to update text:', err);
    setLoading(false);
    setProcessSuccess(false);
    handleErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    // Don't close modal - let admin see the error and try again
  }
};

/**
 * Generic function to handle image URL updates
 */
export const handleEditImageUrl = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  docId: string,
  collectionName: string,
  newImageUrl: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  updateStoreFunction: (data: SmallAboutCardimageType | null) => Promise<void>,
  currentData: SmallAboutCardimageType | null,
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    if (!currentData) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('No image data found!');
      return;
    }

    if (!newImageUrl || newImageUrl.trim() === '') {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('Please enter an image URL.');
      return;
    }

    const result = await getTextDocByID(collectionName, docId);

    if (!result) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('No document found');
      return;
    }

    // Send to backend for authentication check
    const {success, message} = await sendTextToBackend(
      docId,
      newImageUrl,
      handleErrorMessage,
    );

    if (!success) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage(message || 'Failed to update image URL');
      return;
    }

    // Update Firestore
    const firebaseEditSuccess = await updateTextDoc(result.ref, {
      url: newImageUrl,
    });

    if (firebaseEditSuccess) {
      // Update Zustand store
      const updatedImage: SmallAboutCardimageType = {
        ...currentData,
        url: newImageUrl,
      };
      await updateStoreFunction(updatedImage);

      setLoading(false);
      setProcessSuccess(true);
      handleErrorMessage('');

      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setLoading(false);
      handleErrorMessage('Failed to update image URL! Please try again.');
      return;
    }
  } catch (err) {
    console.error('Failed to update image URL:', err);
    setLoading(false);
    setProcessSuccess(false);
    handleErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    // Don't close modal - let admin see the error and try again
  }
};
