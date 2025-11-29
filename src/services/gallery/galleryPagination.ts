import {db} from '../firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  getCountFromServer,
} from 'firebase/firestore';
import {GalleryImageType} from '@/types/galleryTypes';

const IMAGES_PER_PAGE = 15;

/**
 * Get total count of gallery images
 */
export const getGalleryImagesCount = async (): Promise<number> => {
  try {
    const galleryRef = collection(db, 'galleryImages');
    const snapshot = await getCountFromServer(galleryRef);
    return snapshot.data().count;
  } catch (error) {
    console.error('[Gallery] Failed to get count:', error);
    return 0;
  }
};

/**
 * Fetch first page of gallery images
 */
export const fetchFirstPage = async (): Promise<{
  images: GalleryImageType[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const galleryRef = collection(db, 'galleryImages');
    const q = query(
      galleryRef,
      orderBy('order', 'asc'),
      limit(IMAGES_PER_PAGE),
    );

    const snapshot = await getDocs(q);
    const images: GalleryImageType[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<GalleryImageType, 'id'>),
    }));

    const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {images, lastDoc};
  } catch (error) {
    console.error('[Gallery] Failed to fetch first page:', error);
    return {images: [], lastDoc: null};
  }
};

/**
 * Fetch next page of gallery images
 */
export const fetchNextPage = async (
  lastDoc: QueryDocumentSnapshot<DocumentData>,
): Promise<{
  images: GalleryImageType[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const galleryRef = collection(db, 'galleryImages');
    const q = query(
      galleryRef,
      orderBy('order', 'asc'),
      startAfter(lastDoc),
      limit(IMAGES_PER_PAGE),
    );

    const snapshot = await getDocs(q);
    const images: GalleryImageType[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<GalleryImageType, 'id'>),
    }));

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {images, lastDoc: newLastDoc};
  } catch (error) {
    console.error('[Gallery] Failed to fetch next page:', error);
    return {images: [], lastDoc: null};
  }
};

/**
 * Fetch specific page using cursor (efficient)
 * If cursor is provided, uses it. Otherwise falls back to offset method.
 */
export const fetchPageWithCursor = async (
  pageNumber: number,
  cursor: QueryDocumentSnapshot<DocumentData> | null = null,
): Promise<{
  images: GalleryImageType[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    // Page 1: No cursor needed
    if (pageNumber === 1) {
      return fetchFirstPage();
    }

    // If we have a cursor, use it (efficient)
    if (cursor) {
      return fetchNextPage(cursor);
    }

    // Fallback: No cursor available, use offset method (less efficient)
    return fetchPageOffset(pageNumber);
  } catch (error) {
    console.error('[Gallery] Failed to fetch page:', error);
    return {images: [], lastDoc: null};
  }
};

/**
 * Fetch specific page using offset (fallback method)
 * Less efficient but allows jumping to any page
 */
const fetchPageOffset = async (
  pageNumber: number,
): Promise<{
  images: GalleryImageType[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const galleryRef = collection(db, 'galleryImages');
    const skip = (pageNumber - 1) * IMAGES_PER_PAGE;

    const q = query(
      galleryRef,
      orderBy('order', 'asc'),
      limit(skip + IMAGES_PER_PAGE),
    );

    const snapshot = await getDocs(q);
    const allDocs = snapshot.docs;

    // Get only the documents for the current page
    const pageDocs = allDocs.slice(skip);
    const images: GalleryImageType[] = pageDocs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<GalleryImageType, 'id'>),
    }));

    const lastDoc = pageDocs[pageDocs.length - 1] || null;

    return {images, lastDoc};
  } catch (error) {
    console.error('[Gallery] Failed to fetch page with offset:', error);
    return {images: [], lastDoc: null};
  }
};

/**
 * Legacy function for backward compatibility
 */
export const fetchPage = fetchPageOffset;
