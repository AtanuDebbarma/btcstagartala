import {db} from '../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';

/**
 * Get college resource document by ID
 */
export const getCollegeResourceByID = async (
  docId: string,
): Promise<{
  ref: DocumentReference<DocumentData>;
  data: any;
} | null> => {
  try {
    const docRef = doc(db, 'collegeResources', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {ref: docRef, data: docSnap.data()};
    }
    return null;
  } catch (error) {
    console.error('[CollegeResources] Failed to get document:', error);
    return null;
  }
};

/**
 * Update college resource document
 */
export const updateCollegeResource = async (
  ref: DocumentReference<DocumentData>,
  updatedFields: any,
): Promise<boolean> => {
  try {
    await updateDoc(ref, updatedFields);
    return true;
  } catch (error) {
    console.error('[CollegeResources] Failed to update document:', error);
    return false;
  }
};
