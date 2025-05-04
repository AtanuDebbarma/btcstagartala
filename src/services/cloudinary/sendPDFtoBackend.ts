import {auth} from '../firebase';

const BASE_URL: string =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000';

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
  const resURL =
    mode === 'EDIT'
      ? `${BASE_URL}/api/cloudinary/replacePDF`
      : `${BASE_URL}/api/cloudinary/addPDF`;
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
    if (mode === 'EDIT' && !publicId) {
      console.error('No public_id to edit');
      handleUploadErrorMessage('No public_id to edit');
      return {success: false, asset: null};
    }
    if (!folderName) {
      console.error('No folderName');
      handleUploadErrorMessage('No folderName');
      return {success: false, asset: null};
    }

    const token = await user.getIdToken();

    // Prepare FormData
    const formData = new FormData();
    if (mode === 'EDIT' && publicId) {
      formData.append('public_id', publicId);
    }
    formData.append('file', file); // ✅ key name must match `.single('file')`
    formData.append('folderName', folderName);

    const res = await fetch(resURL, {
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
    console.error(`Failed to ${mode} PDF:`, err);
    handleUploadErrorMessage(`Failed to ${mode} PDF! Please try again.`);
    return {success: false, asset: null};
  }
};
