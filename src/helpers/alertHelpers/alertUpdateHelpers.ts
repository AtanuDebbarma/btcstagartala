import {sendEditPDFToBackend} from '@/services/cloudinary/sendPDFtoBackend';
import {sendDeleteImageToBackend} from '@/services/cloudinary/sendtoBackend';
import {addPDF} from '@/services/PDFservices/addPDF';
import {deleteDocument} from '@/services/PDFservices/deletePDF';
import {
  getPDFFilebyfileID,
  updatePDFDoc,
} from '@/services/PDFservices/editPDFfirebase';
import type {AlertsType} from '@/types/homeTypes';
import type {Dispatch, SetStateAction} from 'react';

export const handleAlertAdd = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: AlertsType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  tempFile: File | null,
  fileOne: boolean,
  setUploading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  alerts: [] | AlertsType[],
  setAlerts: (alerts: AlertsType[] | []) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);
  let cloudinarySuccess = false;
  let cloudinaryAsset: {url: string; public_id: string} = {
    url: '',
    public_id: '',
  };
  try {
    if (fileOne && !tempFile) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Please select a file to upload.');
      return;
    }
    // Upload file to Cloudinary
    if (fileOne && tempFile) {
      const {success, asset} = await sendEditPDFToBackend(
        undefined,
        tempFile,
        handleUploadErrorMessage,
        'alerts',
        'ADD',
      );
      cloudinarySuccess = success;
      cloudinaryAsset = asset;
    }

    if (
      fileOne &&
      (!cloudinarySuccess || !cloudinaryAsset.url || !cloudinaryAsset.public_id)
    ) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      return;
    }
    const updatedFile: AlertsType = {
      ...formValues,
      fileURL: cloudinaryAsset.url || '',
      file_public_id: cloudinaryAsset.public_id || '',
    };

    // new data to firebase
    const {firebaseAddSuccess, newNotice} = await addPDF(updatedFile, 'alerts');

    if (firebaseAddSuccess && newNotice) {
      // Update Zustand state with the new notice
      await setAlerts([...alerts, newNotice]);

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
        'Failed to add Alert! Please check values and try again.',
      );
      setLoading(false);
      return;
    }
  } catch (err) {
    console.error('Error adding Alerts:', err);
    setProcessSuccess(false);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    setUploading(false);
    setLoading(false);
    // Don't close modal - let admin see the error and try again
  }
};

export const handleAlertEdit = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: AlertsType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  tempFile: File | null,
  fileOne: boolean,
  setUploading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  alerts: [] | AlertsType[],
  setAlerts: (alerts: AlertsType[] | []) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    // Get existing document from Firebase
    const result = await getPDFFilebyfileID(formValues.id, 'alerts');
    if (!result) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No file found with this id');
      return;
    }

    let cloudinarySuccess = true; // Assume success if not uploading new file
    let cloudinaryAsset = {
      url: result.data.fileURL || '', // Use existing URL
      public_id: result.data.file_public_id || '', // Use existing public_id
    };

    // Only upload to Cloudinary if there's a new file selected
    if (fileOne && tempFile) {
      setUploading(true);
      const {success, asset} = await sendEditPDFToBackend(
        undefined,
        tempFile,
        handleUploadErrorMessage,
        'alerts',
        'EDIT',
      );
      cloudinarySuccess = success;
      cloudinaryAsset = asset;
      setUploading(false);
    }

    // If we tried to upload but failed
    if (
      fileOne &&
      tempFile &&
      (!cloudinarySuccess || !cloudinaryAsset.url || !cloudinaryAsset.public_id)
    ) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('Failed to upload file to Cloudinary.');
      return;
    }

    const updatedFile: AlertsType = {
      ...result.data,
      title: formValues.title,
      content: formValues.content,
      fileName: formValues.fileName,
      fileURL: cloudinaryAsset.url,
      file_public_id: cloudinaryAsset.public_id,
      link1Name: formValues.link1Name,
      link1Url: formValues.link1Url,
      link2Name: formValues.link2Name,
      link2Url: formValues.link2Url,
    };

    const firebaseEditSuccess = await updatePDFDoc(result.ref, updatedFile);

    if (firebaseEditSuccess) {
      // Update Zustand store
      const updatedList = alerts.map(item =>
        item.id === updatedFile.id ? updatedFile : item,
      );
      await setAlerts(updatedList);

      setLoading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      handleUploadErrorMessage(
        'Failed to Edit Alert! Please check values and try again.',
      );
      setLoading(false);
    }
  } catch (err) {
    console.error('Error editing Alert:', err);
    setProcessSuccess(false);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    setUploading(false);
    setLoading(false);
    // Don't close modal - let admin see the error and try again
  }
};

export const handleAlertEditNameOnly = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: AlertsType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  nameonly: boolean,
  setUploading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  alerts: [] | AlertsType[],
  setAlerts: (alerts: AlertsType[] | []) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    if (!nameonly) {
      handleUploadErrorMessage('Not name only');
      return;
    }
    // Get existing document from Firebase
    const result = await getPDFFilebyfileID(formValues.id, 'alerts');
    if (!result) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No file found with this id');
      return;
    }

    const updatedFile: AlertsType = {
      ...result.data,
      title: formValues.title,
      content: formValues.content,
      fileName: formValues.fileName,
      fileURL: formValues.fileURL,
      file_public_id: formValues.file_public_id,
      link1Name: formValues.link1Name,
      link1Url: formValues.link1Url,
      link2Name: formValues.link2Name,
      link2Url: formValues.link2Url,
    };

    const firebaseEditSuccess = await updatePDFDoc(result.ref, updatedFile);

    if (firebaseEditSuccess) {
      // Update Zustand store
      const updatedList = alerts.map(item =>
        item.id === updatedFile.id ? updatedFile : item,
      );
      await setAlerts(updatedList);

      setLoading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      handleUploadErrorMessage(
        'Failed to Edit Alert! Please check values and try again.',
      );
      setLoading(false);
    }
  } catch (err) {
    console.error('Error editing Alert:', err);
    setProcessSuccess(false);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    setUploading(false);
    setLoading(false);
    // Don't close modal - let admin see the error and try again
  }
};

export const handleAlertEditContentOnly = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: AlertsType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  contentOnly: boolean,
  setUploading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  alerts: [] | AlertsType[],
  setAlerts: (alerts: AlertsType[] | []) => Promise<void>,
) => {
  setLoading(true);
  setProcessSuccess(false);

  try {
    if (!contentOnly) {
      handleUploadErrorMessage('Not content only');
      return;
    }
    // Get existing document from Firebase
    const result = await getPDFFilebyfileID(formValues.id, 'alerts');
    if (!result) {
      setLoading(false);
      setUploading(false);
      setProcessSuccess(false);
      handleUploadErrorMessage('No file found with this id');
      return;
    }

    const updatedFile: AlertsType = {
      ...result.data,
      title: formValues.title,
      content: formValues.content,
      fileName: formValues.fileName,
      fileURL: formValues.fileURL,
      file_public_id: formValues.file_public_id,
      link1Name: formValues.link1Name,
      link1Url: formValues.link1Url,
      link2Name: formValues.link2Name,
      link2Url: formValues.link2Url,
    };

    const firebaseEditSuccess = await updatePDFDoc(result.ref, updatedFile);

    if (firebaseEditSuccess) {
      // Update Zustand store
      const updatedList = alerts.map(item =>
        item.id === updatedFile.id ? updatedFile : item,
      );
      await setAlerts(updatedList);

      setLoading(false);
      setProcessSuccess(true);
      handleUploadErrorMessage('');
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } else {
      setProcessSuccess(false);
      handleUploadErrorMessage(
        'Failed to Edit Alert! Please check values and try again.',
      );
      setLoading(false);
    }
  } catch (err) {
    console.error('Error editing Alert:', err);
    setProcessSuccess(false);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    setUploading(false);
    setLoading(false);
    // Don't close modal - let admin see the error and try again
  }
};

export const handleAlertDelete = async (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  formValues: AlertsType,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUploading: Dispatch<SetStateAction<boolean>>,
  handleUploadErrorMessage: (message: string) => void,
  setProcessSuccess: Dispatch<SetStateAction<boolean>>,
  alerts: [] | AlertsType[],
  setAlerts: (alerts: AlertsType[] | []) => Promise<void>,
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
    formValues.file_public_id,
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
      'alerts',
      handleUploadErrorMessage,
    );

    if (firebaseSuccess) {
      // ✅ Update Zustand state
      const updatedAlerts = alerts.filter(item => item.id !== formValues.id);
      await setAlerts(updatedAlerts);

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
    setLoading(false);
    setUploading(false);
    setProcessSuccess(false);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    // Don't close modal - let admin see the error and try again
  }
};
