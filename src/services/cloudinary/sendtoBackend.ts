import {
  genericDeleteFile,
  genericAddFile,
  genericReplaceFile,
} from '../shared/genericCloudinaryService';

/**
 * Sends a public_id to the Express backend with Firebase auth token in headers.
 *
 * @param publicId - The ID to send.
 * @returns A boolean response and error message from the backend.
 */
export const sendDeleteImageToBackend = async (
  publicId: string,
  handleUploadErrorMessage: (message: string) => void,
): Promise<{success: boolean}> => {
  return genericDeleteFile(publicId, handleUploadErrorMessage);
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
): Promise<{success: boolean; asset: any}> => {
  return genericReplaceFile(
    publicId,
    file,
    handleUploadErrorMessage,
    folderName,
    'replace',
  );
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
): Promise<{success: boolean; asset: any}> => {
  return genericAddFile(file, handleUploadErrorMessage, folderName, 'add');
};
