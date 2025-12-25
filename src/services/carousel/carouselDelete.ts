import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import {db} from '../firebase';
import type {CarouselImage} from '@/types/homeTypes';

const imagesRef = collection(db, 'carouselImages');

/**
 * Deletes an image from the Firestore and shifts all subsequent images down by 1
 */
export const deleteCarouselImage = async (imageOrder: number) => {
  // Step 1: Get the doc with the imageOrder
  const q = query(imagesRef, where('imageOrder', '==', imageOrder));
  const snapshot = await getDocs(q);
  if (snapshot.empty) throw new Error('Image not found');

  const targetDoc = snapshot.docs[0];

  // Step 2: Get all images after the one to delete
  const q2 = query(
    imagesRef,
    where('imageOrder', '>', imageOrder),
    orderBy('imageOrder'),
  );
  const afterSnapshot = await getDocs(q2);

  const batch = writeBatch(db);

  // Step 3: Delete the target image
  batch.delete(targetDoc.ref);

  // Step 4: Shift all following images down by 1
  afterSnapshot.forEach(doc => {
    const data = doc.data() as CarouselImage;
    const newImageOrder = Math.max(data.imageOrder - 1, 1); // Ensure imageOrder doesn't go below 1
    batch.update(doc.ref, {imageOrder: newImageOrder});
  });

  // Commit the batch
  await batch.commit();
};
