import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import {CarouselImage} from '@/types/homeTypes';
import {db} from '../firebase';

const imagesRef = collection(db, 'carouselImages');

/**
 * Get Firestore doc ref for the image with a specific imageOrder
 */
export const getImageDocByOrder = async (
  imageOrder: number,
): Promise<{
  ref: DocumentReference<DocumentData>;
  data: CarouselImage;
} | null> => {
  const q = query(imagesRef, where('imageOrder', '==', imageOrder));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return {ref: doc.ref, data: doc.data() as CarouselImage};
};

/**
 * Update the document by its DocumentReference
 */
export const updateImageDoc = async (
  ref: DocumentReference<DocumentData>,
  updatedFields: Partial<CarouselImage>,
): Promise<boolean> => {
  try {
    await updateDoc(ref, updatedFields);
    return true;
  } catch (error) {
    console.error('Failed to update document:', error);
    return false;
  }
};
