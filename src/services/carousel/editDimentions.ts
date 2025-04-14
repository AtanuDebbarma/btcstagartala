import {getDocs, collection, updateDoc, doc} from 'firebase/firestore';
import {db} from '../firebase';
import {Dimensions} from './fetchDimentions';

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
      console.warn('No document found in carouselDimentions collection.');
      return false;
    }

    const targetDoc = querySnapshot.docs[0];
    const docRef = doc(db, 'carouselDimentions', targetDoc.id);

    await updateDoc(docRef, updatedValues);
    console.log('Carousel dimensions updated successfully.');
    return true;
  } catch (error) {
    console.error('Failed to update carousel dimensions:', error);
    return false;
  }
};
