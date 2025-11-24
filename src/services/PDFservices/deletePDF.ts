import {collection, query, where, getDocs, deleteDoc} from 'firebase/firestore';
import {db} from '../firebase';

/**
 * Deletes a document from the Firestore.
 * @param fileID - The ID of the document to delete
 * @param folderName - The collection name where the document resides
 * @param handleUploadErrorMessage - Callback function to handle error messages
 */
export const deleteDocument = async (
  fileID: string,
  folderName: string,
  handleUploadErrorMessage: (message: string) => void,
) => {
  try {
    const documentRef = collection(db, folderName);

    // Step 1: Get the doc with the matching fileID
    const q = query(documentRef, where('id', '==', fileID));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      handleUploadErrorMessage('File not found');
      return {firebaseSuccess: false};
    }

    const targetDoc = snapshot.docs[0];

    // Step 2: Delete the target document
    try {
      await deleteDoc(targetDoc.ref);
      return {firebaseSuccess: true};
    } catch (error) {
      console.error('Error deleting document:', error);
      handleUploadErrorMessage('Failed to delete file. Please try again.');
      return {firebaseSuccess: false};
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    handleUploadErrorMessage('Failed to delete file. Please try again.');
    return {firebaseSuccess: false};
  }
};
