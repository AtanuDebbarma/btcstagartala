import {sendEditPDFToBackend} from '@/services/cloudinary/sendPDFtoBackend';
import type {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import type React from 'react';
import {
  getPDFFilebyfileID,
  updatePDFDoc,
} from '../../services/PDFservices/editPDFfirebase';
import {Timestamp} from 'firebase/firestore';

export const handleEditProspectus = async (
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  selectedPDF: ProspectusAndAdmissionFormType | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  tempFile: File | null,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  prospectusAndAdmission: [] | ProspectusAndAdmissionFormType[],
  setProspectusAndAdmission: (
    data: ProspectusAndAdmissionFormType[] | [],
  ) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);
  setUploading(true);

  // Add timeout to prevent infinite loading
  const timeoutId = setTimeout(() => {
    setLoading(false);
    setUploading(false);
    handleUploadErrorMessage('Upload timeout. Please try again.');
  }, 30000); // 30 second timeout

  try {
    if (!prospectusAndAdmission.length || !selectedPDF) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No Files found!');
      return;
    }
    if (!tempFile) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Please select a file to upload.');
      return;
    }
    const result = await getPDFFilebyfileID(
      selectedPDF.id,
      'prospectusAndAdmission',
    );

    if (!result) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No file found with this id');
      return;
    }

    const {success, asset} = await sendEditPDFToBackend(
      selectedPDF.public_id,
      tempFile,
      handleUploadErrorMessage,
      'prospectusAndAdmission',
      'EDIT',
    );

    if (!success || !asset.url) {
      console.error('Backend upload failed:', {success, asset});
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      return;
    }

    const updatedFile: ProspectusAndAdmissionFormType = {
      ...selectedPDF,
      url: asset.url,
      public_id: asset.public_id,
      createdAt: Timestamp.now(),
    };

    const firebaseEditSuccess = await updatePDFDoc(result.ref, {
      url: updatedFile.url,
      public_id: updatedFile.public_id,
      createdAt: updatedFile.createdAt,
    });

    if (firebaseEditSuccess) {
      clearTimeout(timeoutId); // Clear timeout on success

      // ✅ Update Zustand store
      const updatedList = prospectusAndAdmission.map(item =>
        item.id === updatedFile.id ? updatedFile : item,
      );
      await setProspectusAndAdmission(updatedList);

      setLoading(false);
      setUploading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');

      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      clearTimeout(timeoutId); // Clear timeout on failure
      setProcessSuccess(false);
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage(
        'Failed to update Firestore! Please check connection and try again.',
      );
      return;
    }
  } catch (err) {
    clearTimeout(timeoutId); // Clear timeout on error
    console.error('Failed to update PDF:', err);
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    // Don't close modal - let admin see the error and try again
  }
};
