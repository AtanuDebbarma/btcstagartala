import {addDoc, collection, Timestamp, updateDoc} from 'firebase/firestore';
import {db} from '../firebase';
import {logger} from '../../utils/logger';

export const addPDF = async (
  newFile: any,
  collectionName: string,
): Promise<{
  firebaseAddSuccess: boolean;
  newNotice?: any;
}> => {
  try {
    const fileRef = collection(db, collectionName);

    const createdAt = Timestamp.now();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      logger.error('Failed to update document with ID field:', err);
      return {firebaseAddSuccess: false};
    }
    const newNotice: any = {
      ...fileData,
      id: docRef.id,
      createdAt,
    };

    return {firebaseAddSuccess: true, newNotice};
  } catch (error) {
    logger.error('Failed to add File:', error);
    return {firebaseAddSuccess: false};
  }
};
