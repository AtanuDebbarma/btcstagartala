import {auth} from '../firebase';
import {logger} from '@/utils/logger';

const BASE_URL: string =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000';

type DocumentData = {
  name: string;
  url: string;
};

/**
 * Add a new document
 */
export const addDocument = async (
  collectionName: string,
  documentData: DocumentData,
  handleErrorMessage: (message: string) => void,
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  const resURL = `${BASE_URL}/api/protected/addDocument`;
  try {
    const user = auth.currentUser;
    const allowedAdminEmails: string[] = [
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
    ];
    const isAdmin = allowedAdminEmails.includes(user?.email || '');

    if (!user || !isAdmin) {
      logger.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const res = await fetch(resURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName,
          documentData,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();
      if (!data.success && data.message) {
        handleErrorMessage(data.message);
        return {success: false, message: data.message};
      }
      return {
        success: data.success,
        message: data.message || 'Success',
        data: data.data,
      };
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        logger.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    logger.error('Failed to add document:', err);
    handleErrorMessage('Failed to add document! Please try again.');
    return {
      success: false,
      message: 'Failed to add document! Please try again.',
    };
  }
};

/**
 * Update an existing document
 */
export const updateDocument = async (
  collectionName: string,
  docId: string,
  documentData: Partial<DocumentData>,
  handleErrorMessage: (message: string) => void,
): Promise<{
  success: boolean;
  message: string;
}> => {
  const resURL = `${BASE_URL}/api/protected/updateDocument`;
  try {
    const user = auth.currentUser;
    const allowedAdminEmails: string[] = [
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
    ];
    const isAdmin = allowedAdminEmails.includes(user?.email || '');

    if (!user || !isAdmin) {
      logger.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const res = await fetch(resURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName,
          docId,
          documentData,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();
      if (!data.success && data.message) {
        handleErrorMessage(data.message);
        return {success: false, message: data.message};
      }
      return {success: data.success, message: data.message || 'Success'};
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        logger.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    logger.error('Failed to update document:', err);
    handleErrorMessage('Failed to update document! Please try again.');
    return {
      success: false,
      message: 'Failed to update document! Please try again.',
    };
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (
  collectionName: string,
  docId: string,
  handleErrorMessage: (message: string) => void,
): Promise<{
  success: boolean;
  message: string;
}> => {
  const resURL = `${BASE_URL}/api/protected/deleteDocument`;
  try {
    const user = auth.currentUser;
    const allowedAdminEmails: string[] = [
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
    ];
    const isAdmin = allowedAdminEmails.includes(user?.email || '');

    if (!user || !isAdmin) {
      logger.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const res = await fetch(resURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName,
          docId,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();
      if (!data.success && data.message) {
        handleErrorMessage(data.message);
        return {success: false, message: data.message};
      }
      return {success: data.success, message: data.message || 'Success'};
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        logger.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    logger.error('Failed to delete document:', err);
    handleErrorMessage('Failed to delete document! Please try again.');
    return {
      success: false,
      message: 'Failed to delete document! Please try again.',
    };
  }
};
/**
 * Update an existing document with generic data
 */
export const updateDocumentGeneric = async (
  collectionName: string,
  docId: string,
  documentData: Record<string, any>,
  handleErrorMessage: (message: string) => void,
): Promise<{
  success: boolean;
  message: string;
}> => {
  const resURL = `${BASE_URL}/api/protected/updateDocument`;
  try {
    const user = auth.currentUser;
    const allowedAdminEmails: string[] = [
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
    ];
    const isAdmin = allowedAdminEmails.includes(user?.email || '');

    if (!user || !isAdmin) {
      logger.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const res = await fetch(resURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName,
          docId,
          documentData,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();
      if (!data.success && data.message) {
        handleErrorMessage(data.message);
        return {success: false, message: data.message};
      }
      return {success: data.success, message: data.message || 'Success'};
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        logger.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    logger.error('Failed to update document:', err);
    handleErrorMessage('Failed to update document! Please try again.');
    return {
      success: false,
      message: 'Failed to update document! Please try again.',
    };
  }
};

/**
 * Batch update multiple documents in a collection
 */
export const batchUpdateDocuments = async (
  collectionName: string,
  updates: {docId: string; documentData: Record<string, any>}[],
  handleErrorMessage: (message: string) => void,
): Promise<{
  success: boolean;
  message: string;
}> => {
  const resURL = `${BASE_URL}/api/protected/batchUpdateDocuments`;
  try {
    const user = auth.currentUser;
    const allowedAdminEmails: string[] = [
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
      import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
    ];
    const isAdmin = allowedAdminEmails.includes(user?.email || '');

    if (!user || !isAdmin) {
      logger.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const res = await fetch(resURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName,
          updates,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();
      if (!data.success && data.message) {
        handleErrorMessage(data.message);
        return {success: false, message: data.message};
      }
      return {success: data.success, message: data.message || 'Success'};
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        logger.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    logger.error('Failed to batch update documents:', err);
    handleErrorMessage('Failed to batch update documents! Please try again.');
    return {
      success: false,
      message: 'Failed to batch update documents! Please try again.',
    };
  }
};
