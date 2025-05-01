import {NoticeBoardType} from '@/types/homeTypes';
import {addDoc, collection, Timestamp, updateDoc} from 'firebase/firestore';
import {db} from '../firebase';

export const addPDF = async (
  newFile: NoticeBoardType,
  collectionName: string,
): Promise<{firebaseAddSuccess: boolean; newNotice?: NoticeBoardType}> => {
  try {
    const fileRef = collection(db, collectionName);

    const createdAt = Timestamp.now();

    const {id: _, ...fileData} = newFile; // remove id, Firebase will generate it

    // Add document to Firestore
    const docRef = await addDoc(fileRef, {
      ...fileData,
      createdAt,
    });

    try {
      await updateDoc(docRef, {
        id: docRef.id,
      });
    } catch (err) {
      console.error('Failed to update document with ID field:', err);
      return {firebaseAddSuccess: false};
    }
    const newNotice: NoticeBoardType = {
      ...fileData,
      id: docRef.id,
      createdAt,
    };

    return {firebaseAddSuccess: true, newNotice};
  } catch (error) {
    console.error('Failed to add File:', error);
    return {firebaseAddSuccess: false};
  }
};
