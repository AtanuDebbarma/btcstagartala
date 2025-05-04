import {auth} from '@/services/firebase';

const BASE_URL: string =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000';

/**
 * Sends a public_id to the Express backend with Firebase auth token in headers.
 *
 * @param publicId - The ID to send.
 * @returns A boolean respnonse and error message from the backend.
 */
export const sendDeleteImageToBackend = async (
  publicId: string,
  handleUploadErrorMessage: (message: string) => void,
): Promise<{
  success: boolean;
}> => {
  try {
    const user = auth.currentUser;
    const isAdmin = user?.email === import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;
    if (!user || !isAdmin) {
      console.error('User not authenticated');
      handleUploadErrorMessage('User not authenticated');
      return {success: false};
    }
    if (!publicId) {
      console.error('No pubicId selected');
      handleUploadErrorMessage('No pubicId selected');
      return {success: false};
    }

    const token = await user.getIdToken();

    const res = await fetch(`${BASE_URL}/api/cloudinary/deleteFile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // ← ADD THIS
      },
      body: JSON.stringify({public_id: publicId}),
    });

    const data = await res.json();
    if (!data.success && data.message) {
      handleUploadErrorMessage(data.message);
      return {success: false};
    }
    return {success: data.success};
  } catch (err) {
    console.error('Failed to delete file:', err);
    handleUploadErrorMessage('Failed to delete file! Please try again.');
    return {success: false};
  }
};

/**
 * Sends a public_id and a file to the Express backend with Firebase auth token in headers.
 *
 * @param publicId - The ID to replace.
 * @param file - The file to replace the asset with.
 * @returns A JSON response from the backend or an error with an 'asset' key if the request was successful.
 */

export const sendEditImageToBackend = async (
  publicId: string,
  file: File | null,
  handleUploadErrorMessage: (message: string) => void,
  folderName: string,
): Promise<{
  success: boolean;
  asset: any;
}> => {
  try {
    const user = auth.currentUser;
    const isAdmin = user?.email === import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;
    if (!user || !isAdmin) {
      console.error('User not authenticated');
      handleUploadErrorMessage('User not authenticated');
      return {success: false, asset: null};
    }
    if (!file) {
      console.error('No file selected');
      handleUploadErrorMessage('No file selected');
      return {success: false, asset: null};
    }

    const token = await user.getIdToken();

    // Prepare FormData
    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('file', file); // ✅ key name must match `.single('file')`
    formData.append('folderName', folderName);

    const res = await fetch(`${BASE_URL}/api/cloudinary/replace`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // ✅ No Content-Type; fetch sets it automatically with boundary
      },
      body: formData,
    });

    const data = await res.json();
    if (!data.success && data.message) {
      handleUploadErrorMessage(data.message);
      return {success: false, asset: null};
    }
    return {success: data.success, asset: data.asset};
  } catch (err) {
    console.error('Failed to replace image:', err);
    handleUploadErrorMessage('Failed to replace image! Please try again.');
    return {success: false, asset: null};
  }
};

/**
 * Sends a file to the Express backend with Firebase auth token in headers.
 *
 * @param file - The file to add.
 * @returns A boolean response and error message from the backend, as well as the added asset.
 */

export const sendAddImageToBackend = async (
  file: File | null,
  handleUploadErrorMessage: (message: string) => void,
  folderName: string,
): Promise<{
  success: boolean;
  asset: any;
}> => {
  try {
    const user = auth.currentUser;
    const isAdmin = user?.email === import.meta.env.VITE_FIREBASE_ADMIN_EMAIL;
    if (!user || !isAdmin) {
      console.error('User not authenticated');
      handleUploadErrorMessage('User not authenticated');
      return {success: false, asset: null};
    }
    if (!file) {
      console.error('No file selected');
      handleUploadErrorMessage('No file selected');
      return {success: false, asset: null};
    }

    const token = await user.getIdToken();

    // Prepare FormData
    const formData = new FormData();
    formData.append('file', file); // ✅ key name must match `.single('file')`
    formData.append('folderName', folderName); // folderName from params.

    const res = await fetch(`${BASE_URL}/api/cloudinary/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // ✅ No Content-Type; fetch sets it automatically with boundary
      },
      body: formData,
    });

    const data = await res.json();
    if (!data.success && data.message) {
      handleUploadErrorMessage(data.message);
      return {success: false, asset: null};
    }
    return {success: data.success, asset: data.asset};
  } catch (err) {
    console.error('Failed to add image:', err);
    handleUploadErrorMessage('Failed to add image');
    return {success: false, asset: null};
  }
};
