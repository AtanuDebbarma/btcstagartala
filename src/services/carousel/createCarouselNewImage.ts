import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import {db} from '../firebase';
import {CarouselImage} from '@/types/homeTypes';
import {Dispatch, SetStateAction} from 'react';

/**
 * Adds a new image to the carousel and shifts all subsequent image orders by +1.
 * @param {CarouselImage} newImage - The new image to add, with an imageOrder that is >= 1.
 * @param {Dispatch<SetStateAction<CarouselImage[]>>} setCarouselImages - A React state setter for the `carouselImages` state.
 * @returns {Promise<{success: boolean}>} - A promise that resolves to an object with a single key of `success`, which is a boolean indicating whether the image was added successfully.
 */
export const addCarouselImage = async (
  newImage: CarouselImage,
  setCarouselImages: Dispatch<SetStateAction<CarouselImage[]>>,
): Promise<{success: boolean}> => {
  try {
    const imagesRef = collection(db, 'carouselImages');

    // Step 1: Get images where imageOrder >= newImage.imageOrder
    const q = query(
      imagesRef,
      where('imageOrder', '>=', newImage.imageOrder),
      orderBy('imageOrder'),
    );
    const snapshot = await getDocs(q);

    const batch = writeBatch(db);

    // Step 2: Shift all imageOrders in conflict by +1
    snapshot.forEach(doc => {
      const data = doc.data() as CarouselImage;
      batch.update(doc.ref, {
        imageOrder: data.imageOrder + 1,
      });
    });

    await batch.commit();

    // Step 3: Add new image with createdAt
    const createdAt = Timestamp.now();
    const docRef = await addDoc(imagesRef, {
      ...newImage,
      createdAt,
    });

    // Step 4: Update local state manually
    setCarouselImages(prev => {
      // Shift imageOrder in local state as well
      const updated = prev.map(img => {
        if (img.imageOrder >= newImage.imageOrder) {
          return {...img, imageOrder: img.imageOrder + 1};
        }
        return img;
      });

      // Add new image into local state
      const newImageWithMeta: CarouselImage = {
        ...newImage,
        id: docRef.id,
        createdAt,
      };

      return [...updated, newImageWithMeta].sort(
        (a, b) => a.imageOrder - b.imageOrder,
      );
    });

    return {success: true};
  } catch (error) {
    console.error('Failed to add image:', error);
    return {success: false};
  }
};
