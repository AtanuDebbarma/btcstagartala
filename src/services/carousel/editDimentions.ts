import {getDocs, collection, updateDoc, doc} from 'firebase/firestore';
import {db} from '../firebase';
import type {Dimensions} from './fetchDimentions';
import {logger} from '../../utils/logger';

/**
 * Updates the existing carousel dimensions document in Firestore.
 *
 * @param updatedValues - The new dimension values to be stored.
 * @returns A boolean indicating success or failure.
 */
export const updateCarouselDimensions = async (
  updatedValues: Dimensions,
): Promise<boolean> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'carouselDimentions'));

    if (querySnapshot.empty) {
      logger.warn('No document found in carouselDimentions collection.');
      return false;
    }

    const targetDoc = querySnapshot.docs[0];
    const docRef = doc(db, 'carouselDimentions', targetDoc.id);

    await updateDoc(docRef, updatedValues);
    return true;
  } catch (error) {
    logger.error('Failed to update carousel dimensions:', error);
    return false;
  }
};
