import {
  getFilebyfileID,
  sendEditPDFToBackend,
  updatePDFDoc,
} from '@/services/cloudinary/sendPDFtoBackend';
import {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import React from 'react';

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

  try {
    if (!prospectusAndAdmission.length || !selectedPDF) {
      alert('No Files found!');
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
    const result = await getFilebyfileID(selectedPDF.id);

    if (!result) {
      alert('No file found with this id');
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No file found with this id');
      setOpenModal(false);
      return;
    }

    const {success, asset} = await sendEditPDFToBackend(
      selectedPDF.public_id,
      tempFile,
      handleUploadErrorMessage,
      'prospectusAndAdmission',
    );

    if (!success || !asset.url) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      return;
    }

    const updatedFile: ProspectusAndAdmissionFormType = {
      ...selectedPDF,
      url: asset.url,
      public_id: asset.public_id,
    };

    const firebaseEditSuccess = await updatePDFDoc(result.ref, {
      url: updatedFile.url,
      public_id: updatedFile.public_id,
    });

    if (firebaseEditSuccess) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');

      // ✅ Update Zustand store
      const updatedList = prospectusAndAdmission.map(item =>
        item.id === updatedFile.id ? updatedFile : item,
      );

      await setProspectusAndAdmission(updatedList);
      console.log('Updated prospectusAndAdmission in Zustand:');

      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setLoading(false);
      setUploading(false);
      handleUploadErrorMessage(
        'Failed to add PDF! Please check values and try again.',
      );
      return;
    }
  } catch (err) {
    console.error('Failed to update PDF:', err);
    alert('Failed to update PDF! Please check values and try again.');
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage('');
    setOpenModal(false);
  }
};
