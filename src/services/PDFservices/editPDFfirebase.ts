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
 * Update the document by its DocumentReference
 */
export const updatePDFDoc = async (
  ref: DocumentReference<DocumentData>,
  updatedFields: any,
): Promise<boolean> => {
  try {
    await updateDoc(ref, updatedFields);
    return true;
  } catch (error) {
    console.error('Failed to update document:', error);
    return false;
  }
};
