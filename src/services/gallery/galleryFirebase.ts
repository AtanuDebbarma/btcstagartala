import {db} from '@/services/firebase';
import type {
  DocumentData,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {logger} from '../../utils/logger';

/**
 * Add new gallery image to Firestore
 */
export const addGalleryImage = async (
  url: string,
  title: string,
  createdAt: Timestamp,
  order: number,
): Promise<boolean> => {
  try {
    const galleryRef = collection(db, 'galleryImages');
    const docRef = await addDoc(galleryRef, {
      url,
      title,
      createdAt,
      order,
      id: '', // Placeholder, will be updated
    });

    // Update the document with its own ID
    await updateDoc(doc(db, 'galleryImages', docRef.id), {
      id: docRef.id,
    });

    return true;
  } catch (error) {
    logger.error('[Gallery] Failed to add image:', error);
    return false;
  }
};

/**
 * Get gallery image by ID
 */
export const getGalleryImageById = async (
  imageId: string,
): Promise<{
  ref: DocumentReference<DocumentData>;
  data: any;
} | null> => {
  const galleryRef = collection(db, 'galleryImages');
  const q = query(galleryRef, where('id', '==', imageId));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];
  return {ref: docSnap.ref, data: docSnap.data() as any};
};

/**
 * Update gallery image
 */
export const updateGalleryImage = async (
  ref: DocumentReference<DocumentData>,
  updatedFields: any,
): Promise<boolean> => {
  try {
    await updateDoc(ref, updatedFields);
    return true;
  } catch (error) {
    logger.error('[Gallery] Failed to update image:', error);
    return false;
  }
};

/**
 * Delete gallery image from Firestore
 */
export const deleteGalleryImage = async (imageId: string): Promise<boolean> => {
  try {
    const imageRef = doc(db, 'galleryImages', imageId);
    await deleteDoc(imageRef);
    return true;
  } catch (error) {
    logger.error('[Gallery] Failed to delete image:', error);
    return false;
  }
};

/**
 * Update order for multiple gallery images
 */
export const updateGalleryImagesOrder = async (
  updates: {id: string; order: number}[],
): Promise<boolean> => {
  try {
    const updatePromises = updates.map(({id, order}) => {
      const imageRef = doc(db, 'galleryImages', id);
      return updateDoc(imageRef, {order});
    });
    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    logger.error('[Gallery] Failed to update order:', error);
    return false;
  }
};
