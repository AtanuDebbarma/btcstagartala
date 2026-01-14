import {auth} from '../firebase';
import type {FacultyDocument} from '@/types/otherTypes';

const BASE_URL: string =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000';

/**
 * Add a new faculty member
 */
export const addFacultyMember = async (
  facultyData: Omit<FacultyDocument, 'id'>,
  handleErrorMessage: (message: string) => void,
): Promise<{
  success: boolean;
  message: string;
  data?: FacultyDocument;
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
      console.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    // Add timeout for Render cold start (90 seconds)
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
          collectionName: 'faculty',
          documentData: facultyData,
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
        console.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    console.error('Failed to add faculty:', err);
    handleErrorMessage('Failed to add faculty! Please try again.');
    return {
      success: false,
      message: 'Failed to add faculty! Please try again.',
    };
  }
};

/**
 * Update an existing faculty member
 */
export const updateFacultyMember = async (
  docId: string,
  facultyData: Partial<FacultyDocument>,
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
      console.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    // Add timeout for Render cold start (90 seconds)
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
          collectionName: 'faculty',
          docId,
          documentData: facultyData,
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
        console.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    console.error('Failed to update faculty:', err);
    handleErrorMessage('Failed to update faculty! Please try again.');
    return {
      success: false,
      message: 'Failed to update faculty! Please try again.',
    };
  }
};

/**
 * Delete a faculty member
 */
export const deleteFacultyMember = async (
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
      console.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    // Add timeout for Render cold start (90 seconds)
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
          collectionName: 'faculty',
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
        console.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    console.error('Failed to delete faculty:', err);
    handleErrorMessage('Failed to delete faculty! Please try again.');
    return {
      success: false,
      message: 'Failed to delete faculty! Please try again.',
    };
  }
};

/**
 * Update order for multiple faculty members
 */
export const updateFacultyOrder = async (
  updates: {id: string; order: number}[],
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
      console.error('User not authenticated');
      handleErrorMessage('User not authenticated');
      return {success: false, message: 'User not authenticated'};
    }

    const token = await user.getIdToken();

    // Add timeout for Render cold start (90 seconds)
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
          collectionName: 'faculty',
          updates: updates.map(({id, order}) => ({
            docId: id,
            documentData: {order},
          })),
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
        console.error('Request timeout after 90 seconds');
        handleErrorMessage(
          'Request timeout. Server may be starting up, please try again.',
        );
        return {success: false, message: 'Request timeout'};
      }
      throw fetchErr;
    }
  } catch (err) {
    console.error('Failed to update faculty order:', err);
    handleErrorMessage('Failed to update faculty order! Please try again.');
    return {
      success: false,
      message: 'Failed to update faculty order! Please try again.',
    };
  }
};
