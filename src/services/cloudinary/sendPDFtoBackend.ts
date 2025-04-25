import {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import {auth, db} from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';

const BASE_URL: string =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000';

export const sendEditPDFToBackend = async (
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

    const res = await fetch(`${BASE_URL}/api/cloudinary/replacePDF`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // ✅ No Content-Type; fetch sets it automatically with boundary
      },
      body: formData,
    });

    const data = await res.json();
    if (data.message) {
      handleUploadErrorMessage(data.message);
    }
    return {success: data.success, asset: data.asset};
  } catch (err) {
    console.error('Failed to replace PDF:', err);
    handleUploadErrorMessage('Failed to replace PDF! Please try again.');
    return {success: false, asset: null};
  }
};

const imagesRef = collection(db, 'prospectusAndAdmission');

/**
 * Get Firestore doc ref for the image with a specific fileID
 */
export const getFilebyfileID = async (
  fileID: string,
): Promise<{
  ref: DocumentReference<DocumentData>;
  data: ProspectusAndAdmissionFormType;
} | null> => {
  const q = query(imagesRef, where('id', '==', fileID));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return {ref: doc.ref, data: doc.data() as ProspectusAndAdmissionFormType};
};

/**
 * Update the document by its DocumentReference
 */
export const updatePDFDoc = async (
  ref: DocumentReference<DocumentData>,
  updatedFields: Partial<ProspectusAndAdmissionFormType>,
): Promise<boolean> => {
  try {
    await updateDoc(ref, updatedFields);
    return true;
  } catch (error) {
    console.error('Failed to update document:', error);
    return false;
  }
};
