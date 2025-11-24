import {auth} from '../firebase';

const BASE_URL: string =
  import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:5000';

export const sendTextToBackend = async (
  docId: string,
  text: string,
  handleErrorMessage: (message: string) => void,
  collectionName: string = 'smallAboutCard',
): Promise<{
  success: boolean;
  message: string;
}> => {
  const resURL = `${BASE_URL}/api/protected/updateText`;
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

    if (!text || text.trim() === '') {
      console.error('No text provided');
      handleErrorMessage('No text provided');
      return {success: false, message: 'No text provided'};
    }

    if (!docId) {
      console.error('No document ID provided');
      handleErrorMessage('No document ID provided');
      return {success: false, message: 'No document ID provided'};
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
          docId,
          text,
          collectionName,
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
    console.error('Failed to update text:', err);
    handleErrorMessage('Failed to update text! Please try again.');
    return {
      success: false,
      message: 'Failed to update text! Please try again.',
    };
  }
};
