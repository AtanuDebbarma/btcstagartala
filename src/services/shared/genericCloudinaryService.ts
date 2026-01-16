import {auth} from '../firebase';
import {logger} from '../../utils/logger';

const BASE_URL: string =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000';

const allowedAdminEmails: string[] = [
  import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
  import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
];

/**
 * Generic function to validate user authentication
 */
const validateAuth = (
  handleUploadErrorMessage: (message: string) => void,
): {isValid: boolean; user: any} => {
  const user = auth.currentUser;
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  if (!user || !isAdmin) {
    logger.error('User not authenticated');
    handleUploadErrorMessage('User not authenticated');
    return {isValid: false, user: null};
  }

  return {isValid: true, user};
};

/**
 * Generic delete function for both images and PDFs
 */
export const genericDeleteFile = async (
  publicId: string,
  handleUploadErrorMessage: (message: string) => void,
): Promise<{success: boolean}> => {
  try {
    const {isValid, user} = validateAuth(handleUploadErrorMessage);
    if (!isValid) return {success: false};

    if (!publicId) {
      logger.error('No publicId selected');
      handleUploadErrorMessage('No publicId selected');
      return {success: false};
    }

    const token = await user.getIdToken();

    // Add timeout for Render cold start (90 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const res = await fetch(`${BASE_URL}/api/cloudinary/deleteFile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({public_id: publicId}),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle HTTP error responses before parsing JSON
      if (!res.ok) {
        const errorText = await res.text();
        logger.error('Server error:', res.status, errorText);
        handleUploadErrorMessage(
          `Delete failed: ${res.status} ${res.statusText}`,
        );
        return {success: false};
      }

      const data = await res.json();
      if (!data.success && data.message) {
        handleUploadErrorMessage(data.message);
        return {success: false};
      }
      return {success: data.success};
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        logger.error('Request timeout after 90 seconds');
        handleUploadErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false};
      }
      // Handle JSON parsing errors or network errors
      logger.error('Delete request failed:', fetchErr);
      handleUploadErrorMessage(
        'Network error or invalid server response. Please try again.',
      );
      return {success: false};
    }
  } catch (err) {
    logger.error('Failed to delete file:', err);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    return {success: false};
  }
};

/**
 * Generic add function for both images and PDFs
 */
export const genericAddFile = async (
  file: File | null,
  handleUploadErrorMessage: (message: string) => void,
  folderName: string,
  endpoint: 'add' | 'addPDF',
): Promise<{success: boolean; asset: any}> => {
  try {
    const {isValid, user} = validateAuth(handleUploadErrorMessage);
    if (!isValid) return {success: false, asset: null};

    if (!file) {
      logger.error('No file selected');
      handleUploadErrorMessage('No file selected');
      return {success: false, asset: null};
    }

    const token = await user.getIdToken();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderName', folderName);

    // Add timeout for Render cold start + upload (120 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
      const res = await fetch(`${BASE_URL}/api/cloudinary/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle HTTP error responses before parsing JSON
      if (!res.ok) {
        if (res.status === 413) {
          logger.error('File too large (413)');
          handleUploadErrorMessage(
            'File too large! Maximum file size is 10MB.',
          );
          return {success: false, asset: null};
        }
        const errorText = await res.text();
        logger.error('Server error:', res.status, errorText);
        handleUploadErrorMessage(
          `Upload failed: ${res.status} ${res.statusText}`,
        );
        return {success: false, asset: null};
      }

      const data = await res.json();
      if (!data.success && data.message) {
        handleUploadErrorMessage(data.message);
        return {success: false, asset: null};
      }
      return {success: data.success, asset: data.asset};
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        logger.error('Upload timeout after 120 seconds');
        handleUploadErrorMessage(
          'Upload timeout. Server may be starting up, please try again.',
        );
        return {success: false, asset: null};
      }
      // Handle JSON parsing errors or network errors
      logger.error('Upload request failed:', fetchErr);
      handleUploadErrorMessage(
        'Network error or invalid server response. Please try again.',
      );
      return {success: false, asset: null};
    }
  } catch (err) {
    logger.error('Failed to add file:', err);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    return {success: false, asset: null};
  }
};

/**
 * Generic replace/edit function for both images and PDFs
 */
export const genericReplaceFile = async (
  publicId: string | undefined,
  file: File | null,
  handleUploadErrorMessage: (message: string) => void,
  folderName: string,
  endpoint: 'replace' | 'replacePDF',
): Promise<{success: boolean; asset: any}> => {
  try {
    const {isValid, user} = validateAuth(handleUploadErrorMessage);
    if (!isValid) {
      return {success: false, asset: null};
    }

    if (!file) {
      handleUploadErrorMessage('No file selected');
      return {success: false, asset: null};
    }

    if (!publicId) {
      handleUploadErrorMessage('No public_id to edit');
      return {success: false, asset: null};
    }

    const token = await user.getIdToken();

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('file', file);
    formData.append('folderName', folderName);

    const url = `${BASE_URL}/api/cloudinary/${endpoint}`;

    // Add timeout for Render cold start + upload (120 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle HTTP error responses before parsing JSON
      if (!res.ok) {
        if (res.status === 413) {
          logger.error('File too large (413)');
          handleUploadErrorMessage(
            'File too large! Maximum file size is 10MB.',
          );
          return {success: false, asset: null};
        }
        const errorText = await res.text();
        logger.error('Server error:', res.status, errorText);
        handleUploadErrorMessage(
          `Upload failed: ${res.status} ${res.statusText}`,
        );
        return {success: false, asset: null};
      }

      const data = await res.json();

      if (!data.success && data.message) {
        handleUploadErrorMessage(data.message);
        return {success: false, asset: null};
      }
      return {success: data.success, asset: data.asset};
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        logger.error('Upload timeout after 120 seconds');
        handleUploadErrorMessage(
          'Upload timeout. Server may be starting up, please try again.',
        );
        return {success: false, asset: null};
      }
      // Handle JSON parsing errors or network errors
      logger.error('Upload request failed:', fetchErr);
      handleUploadErrorMessage(
        'Network error or invalid server response. Please try again.',
      );
      return {success: false, asset: null};
    }
  } catch (err: any) {
    logger.error('Failed to replace file:', err.message);
    handleUploadErrorMessage(
      'Unexpected error occurred! Please try again or contact support.',
    );
    return {success: false, asset: null};
  }
};
