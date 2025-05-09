import {sendEditPDFToBackend} from '@/services/cloudinary/sendPDFtoBackend';
import {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import React from 'react';
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
    const result = await getPDFFilebyfileID(
      selectedPDF.id,
      'prospectusAndAdmission',
    );

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
      'EDIT',
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
      createdAt: Timestamp.now(),
    };

    const firebaseEditSuccess = await updatePDFDoc(result.ref, {
      url: updatedFile.url,
      public_id: updatedFile.public_id,
      createdAt: updatedFile.createdAt,
    });

    if (firebaseEditSuccess) {
      // ✅ Update Zustand store
      const updatedList = prospectusAndAdmission.map(item =>
        item.id === updatedFile.id ? updatedFile : item,
      );
      await setProspectusAndAdmission(updatedList);

      setLoading(false);
      setUploading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');

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
