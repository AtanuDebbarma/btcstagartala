import {sendEditPDFToBackend} from '@/services/cloudinary/sendPDFtoBackend';
import {sendDeleteImageToBackend} from '@/services/cloudinary/sendtoBackend';
import {addPDF} from '@/services/PDFservices/addPDF';
import {deleteDocument} from '@/services/PDFservices/deletePDF';
import {
  getPDFFilebyfileID,
  updatePDFDoc,
} from '@/services/PDFservices/editPDFfirebase';
import {NoticeBoardType} from '@/types/homeTypes';

import {Dispatch, SetStateAction} from 'react';

export const handleNoticeAdd = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: NoticeBoardType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  tempFile: File | null,
  setUploading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  notices: [] | NoticeBoardType[],
  setNotices: (notices: NoticeBoardType[] | []) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);
  try {
    if (!tempFile) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Please select a file to upload.');
      return;
    }
    // Upload file to Cloudinary
    const {success, asset} = await sendEditPDFToBackend(
      undefined,
      tempFile,
      handleUploadErrorMessage,
      'notice-board',
      'ADD',
    );

    if (!success || !asset.url) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      return;
    }
    const updatedFile: NoticeBoardType = {
      ...formValues,
      url: asset.url,
      public_id: asset.public_id,
    };

    // new data to firebase
    const {firebaseAddSuccess, newNotice} = await addPDF(
      updatedFile,
      'notice-board',
    );

    if (firebaseAddSuccess && newNotice && notices.length > 0) {
      // Update Zustand state with the new notice
      await setNotices([...notices, newNotice]);

      setUploading(false);
      setLoading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setUploading(false);
      handleUploadErrorMessage(
        'Failed to add PDF! Please check values and try again.',
      );
      setLoading(false);
      return;
    }
  } catch (err) {
    console.error('Error adding PDF file:', err);
    alert('Failed to add PDF! Please check values and try again.');
    setProcessSuccess(false);
    handleUploadErrorMessage('');
    setUploading(false);
    setLoading(false);
    setOpenModal(false);
  }
};

export const handleNoticeEdit = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: NoticeBoardType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  tempFile: File | null,
  setUploading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  notices: [] | NoticeBoardType[],
  setNotices: (notices: NoticeBoardType[] | []) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);
  try {
    if (
      !tempFile ||
      !formValues.name ||
      !formValues.url ||
      !formValues.public_id ||
      !formValues.createdAt
    ) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Please select a valid Document to upload.');
      return;
    }
    //get Firebase docuement ref and data.
    const result = await getPDFFilebyfileID(formValues.id, 'notice-board');

    if (!result) {
      alert('No file found with this id');
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No file found with this id');
      setOpenModal(false);
      return;
    }
    // Upload file to Cloudinary
    const {success, asset} = await sendEditPDFToBackend(
      formValues.public_id,
      tempFile,
      handleUploadErrorMessage,
      'notice-board',
      'EDIT',
    );

    if (!success || !asset.url) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      return;
    }
    const updatedFile: NoticeBoardType = {
      ...formValues,
      url: asset.url,
      public_id: asset.public_id,
    };

    const firebaseEditSuccess = await updatePDFDoc(result.ref, {
      name: updatedFile.name,
      url: updatedFile.url,
      public_id: updatedFile.public_id,
    });

    if (firebaseEditSuccess) {
      // ✅ Update Zustand store
      const updatedList = notices.map(item =>
        item.id === updatedFile.id ? updatedFile : item,
      );
      await setNotices(updatedList);

      setUploading(false);
      setLoading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      setUploading(false);
      handleUploadErrorMessage(
        'Failed to Edit PDF! Please check values and try again.',
      );
      setLoading(false);
      return;
    }
  } catch (err) {
    console.error('Error adding PDF file:', err);
    alert('Failed to Edit PDF! Please check values and try again.');
    setProcessSuccess(false);
    handleUploadErrorMessage('');
    setUploading(false);
    setLoading(false);
    setOpenModal(false);
  }
};

export const handleNoticeEditNameOnly = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: NoticeBoardType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  notices: [] | NoticeBoardType[],
  setNotices: (notices: NoticeBoardType[] | []) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);
  try {
    if (
      !formValues.name ||
      !formValues.url ||
      !formValues.public_id ||
      !formValues.createdAt
    ) {
      setLoading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Please select a valid document to edit.');
      return;
    }
    //get Firebase docuement ref and data.
    const result = await getPDFFilebyfileID(formValues.id, 'notice-board');

    if (!result) {
      alert('No document found with this id');
      setLoading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No document found with this id');
      setOpenModal(false);
      return;
    }

    const firebaseEditSuccess = await updatePDFDoc(result.ref, {
      name: formValues.name,
    });

    if (firebaseEditSuccess) {
      // ✅ Update Zustand store
      const updatedList = notices.map(item =>
        item.id === formValues.id ? formValues : item,
      );
      await setNotices(updatedList);

      setLoading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      handleUploadErrorMessage(
        'Failed to Edit PDF! Please check values and try again.',
      );
      setLoading(false);
      return;
    }
  } catch (err) {
    console.error('Error adding PDF file:', err);
    alert('Failed to Edit PDF! Please check values and try again.');
    setProcessSuccess(false);
    handleUploadErrorMessage('');
    setLoading(false);
    setOpenModal(false);
  }
};

export const handleNoticeDelete = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: NoticeBoardType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUploading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  notices: [] | NoticeBoardType[],
  setNotices: (notices: NoticeBoardType[] | []) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);

  if (!formValues || !formValues.id) {
    setLoading(false);
    setUploading(false);
    handleUploadErrorMessage('No file selected!');
    setProcessSuccess(false);
    return;
  }

  const {success} = await sendDeleteImageToBackend(
    formValues.public_id,
    handleUploadErrorMessage,
  );

  if (!success) {
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    return;
  }

  try {
    const {firebaseSuccess} = await deleteDocument(
      formValues.id,
      'notice-board',
      handleUploadErrorMessage,
    );

    if (firebaseSuccess) {
      // ✅ Update Zustand state
      const updatedNotices = notices.filter(item => item.id !== formValues.id);
      await setNotices(updatedNotices);

      setLoading(false);
      setUploading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');

      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      console.error('Failed to delete file:');
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Failed to delete file! Try again.');
      setOpenModal(false);
    }
  } catch (err) {
    console.error('Failed to delete file:', err);
    alert('Failed to delete file! Try again.');
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage('');
    setOpenModal(false);
  }
};
