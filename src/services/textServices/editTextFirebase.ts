import {db} from '@/services/firebase';
import {doc, getDoc, updateDoc, DocumentReference} from 'firebase/firestore';

/**
 * Generic function to get Firestore doc ref by document ID
 */
export const getTextDocByID = async (
  collectionName: string,
  docID: string,
): Promise<{
  ref: DocumentReference;
  data: any;
} | null> => {
  const docRef = doc(db, collectionName, docID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {ref: docRef, data: docSnap.data()};
};

/**
 * Generic function to update document by its DocumentReference
 */
export const updateTextDoc = async (
  ref: DocumentReference,
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
