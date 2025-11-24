import {db} from '@/services/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
/**
 * Get Firestore doc ref for the image with a specific fileID
 */
export const getPDFFilebyfileID = async (
  fileID: string,
  collectionName: string,
): Promise<{
  ref: DocumentReference<DocumentData>;
  data: any;
} | null> => {
  const fileRef = collection(db, collectionName);
  const q = query(fileRef, where('id', '==', fileID));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return {ref: doc.ref, data: doc.data() as any};
};

/**
 * Update the document by its DocumentReference with retry logic
 */
export const updatePDFDoc = async (
  ref: DocumentReference<DocumentData>,
  updatedFields: any,
  retries = 3,
): Promise<boolean> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await updateDoc(ref, updatedFields);
      return true;
    } catch (error: any) {
      // If it's the last attempt, log error and return false
      if (attempt === retries) {
        console.error('Failed to update Firestore document:', error.message);
        return false;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
};
