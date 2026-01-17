import type {Timestamp} from 'firebase/firestore';
import {logger} from '../../utils/logger';
import {
  addDocument,
  updateDocumentGeneric,
  deleteDocument,
  batchUpdateDocuments,
} from '../backend/documentCRUD';

/**
 * Add new gallery image using backend API
 */
export const addGalleryImageBackend = async (
  url: string,
  title: string,
  createdAt: Timestamp,
  order: number,
  handleErrorMessage: (message: string) => void,
): Promise<{success: boolean; data?: any}> => {
  try {
    const result = await addDocument(
      'galleryImages',
      {
        url,
        title,
        order: order.toString(), // Convert to string for DocumentData compatibility
        createdAt: createdAt.toDate().toISOString(), // Convert timestamp for backend
      } as any,
      handleErrorMessage,
    );

    if (result.success) {
      logger.info('Gallery image added successfully via backend');
      return {success: true, data: result.data};
    } else {
      logger.error('Failed to add gallery image via backend:', result.message);
      return {success: false};
    }
  } catch (error) {
    logger.error('Failed to add gallery image:', error);
    handleErrorMessage('Failed to add gallery image. Please try again.');
    return {success: false};
  }
};

/**
 * Update gallery image using backend API
 */
export const updateGalleryImageBackend = async (
  imageId: string,
  updatedFields: Record<string, any>,
  handleErrorMessage: (message: string) => void,
): Promise<boolean> => {
  try {
    const result = await updateDocumentGeneric(
      'galleryImages',
      imageId,
      updatedFields,
      handleErrorMessage,
    );

    if (result.success) {
      logger.info('Gallery image updated successfully via backend');
      return true;
    } else {
      logger.error(
        'Failed to update gallery image via backend:',
        result.message,
      );
      return false;
    }
  } catch (error) {
    logger.error('Failed to update gallery image:', error);
    handleErrorMessage('Failed to update gallery image. Please try again.');
    return false;
  }
};

/**
 * Delete gallery image using backend API
 */
export const deleteGalleryImageBackend = async (
  imageId: string,
  handleErrorMessage: (message: string) => void,
): Promise<boolean> => {
  try {
    const result = await deleteDocument(
      'galleryImages',
      imageId,
      handleErrorMessage,
    );

    if (result.success) {
      logger.info('Gallery image deleted successfully via backend');
      return true;
    } else {
      logger.error(
        'Failed to delete gallery image via backend:',
        result.message,
      );
      return false;
    }
  } catch (error) {
    logger.error('Failed to delete gallery image:', error);
    handleErrorMessage('Failed to delete gallery image. Please try again.');
    return false;
  }
};

/**
 * Update order for multiple gallery images using backend API
 */
export const updateGalleryImagesOrderBackend = async (
  updates: {id: string; order: number}[],
  handleErrorMessage: (message: string) => void,
): Promise<boolean> => {
  try {
    const batchUpdates = updates.map(({id, order}) => ({
      docId: id,
      documentData: {order},
    }));

    const result = await batchUpdateDocuments(
      'galleryImages',
      batchUpdates,
      handleErrorMessage,
    );

    if (result.success) {
      logger.info('Gallery images order updated successfully via backend');
      return true;
    } else {
      logger.error(
        'Failed to update gallery images order via backend:',
        result.message,
      );
      return false;
    }
  } catch (error) {
    logger.error('Failed to update gallery images order:', error);
    handleErrorMessage('Failed to update gallery order. Please try again.');
    return false;
  }
};
