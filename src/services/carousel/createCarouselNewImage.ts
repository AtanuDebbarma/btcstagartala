import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  orderBy,
  query,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import {db} from '../firebase';
import type {CarouselImage} from '@/types/homeTypes';
import {appStore} from '@/appStore/appStore';
import {logger} from '../../utils/logger';

/**
 * Adds a new image to the carousel and shifts all subsequent image orders by +1.
 * @param {CarouselImage} newImage - The new image to add, with an imageOrder that is >= 1.
 * @param {(carouselImages: CarouselImage[] | []) => Promise<void>} setCarouselImages - A React state setter for the `carouselImages` state.
 * @returns {Promise<{success: boolean}>} - A promise that resolves to an object with a single key of `success`, which is a boolean indicating whether the image was added successfully.
 */
export const addCarouselImage = async (
  newImage: CarouselImage,
  setCarouselImages: (carouselImages: CarouselImage[] | []) => Promise<void>,
): Promise<{success: boolean}> => {
  const {carouselImages} = appStore.getState();
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

    const createdAt = Timestamp.now();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id: _, ...imageData} = newImage;

    const docRef = await addDoc(imagesRef, {
      ...imageData,
      createdAt,
    });

    await updateDoc(docRef, {
      id: docRef.id,
    }).catch(err => {
      logger.warn('Failed to update document with ID field:', err);
    });

    // Update Zustand store
    const updatedImages = (carouselImages ?? []).map(img => {
      if (img.imageOrder >= newImage.imageOrder) {
        return {...img, imageOrder: img.imageOrder + 1};
      }
      return img;
    });

    const newImageWithMeta: CarouselImage = {
      ...newImage,
      id: docRef.id,
      createdAt,
    };

    const newState = [...updatedImages, newImageWithMeta].sort(
      (a, b) => a.imageOrder - b.imageOrder,
    );

    await setCarouselImages(newState);

    return {success: true};
  } catch (error) {
    logger.error('Failed to add image:', error);
    return {success: false};
  }
};
