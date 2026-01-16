import type {CollegeResourceType} from '@/types/collegeResourcesTypes';
import type React from 'react';
import {
  getCollegeResourceByID,
  updateCollegeResource,
} from '@/services/collegeResources/editCollegeResourceFirebase';
import {sendTextToBackend} from '@/services/backend/sendTextToBackend';

/**
 * Handle editing college resource image URL
 */
export const handleEditCollegeResourceUrl = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedResource: CollegeResourceType | null,
  newImageUrl: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  handleErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setCollegeResources: (data: CollegeResourceType[] | []) => Promise<void>,
  collegeResources: CollegeResourceType[] | [],
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    if (!selectedResource) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('No resource data found!');
      return;
    }

    if (!newImageUrl || newImageUrl.trim() === '') {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('Please enter an image URL.');
      return;
    }

    const result = await getCollegeResourceByID(selectedResource.id);

    if (!result) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage('No document found');
      return;
    }

    // Send to backend for authentication check
    const {success, message} = await sendTextToBackend(
      selectedResource.id,
      newImageUrl,
      handleErrorMessage,
      'collegeResources',
    );

    if (!success) {
      setLoading(false);
      setProcessSuccess(false);
      handleErrorMessage(message || 'Failed to update image URL');
      return;
    }

    // Update Firestore
    const firebaseEditSuccess = await updateCollegeResource(result.ref, {
      url: newImageUrl,
    });

    if (firebaseEditSuccess) {
      // Update Zustand store
      const updatedResources = collegeResources.map(resource =>
        resource.id === selectedResource.id
          ? {...resource, url: newImageUrl}
          : resource,
      );
      await setCollegeResources(updatedResources);

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
