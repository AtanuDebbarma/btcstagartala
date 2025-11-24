import {
  genericAddFile,
  genericReplaceFile,
} from '../shared/genericCloudinaryService';

export const sendEditPDFToBackend = async (
  publicId: string | undefined,
  file: File | null,
  handleUploadErrorMessage: (message: string) => void,
  folderName: string,
  mode: 'ADD' | 'EDIT',
): Promise<{
  success: boolean;
  asset: any;
}> => {
  if (mode === 'EDIT') {
    return genericReplaceFile(
      publicId,
      file,
      handleUploadErrorMessage,
      folderName,
      'replacePDF',
    );
  } else {
    return genericAddFile(file, handleUploadErrorMessage, folderName, 'addPDF');
  }
};
