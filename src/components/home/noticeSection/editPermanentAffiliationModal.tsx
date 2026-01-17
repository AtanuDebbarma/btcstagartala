import React, {useState} from 'react';
import {appStore} from '@/appStore/appStore';
import type {PermanentAffiliationType} from '@/types/homeTypes';
import {updateDocument} from '@/services/backend/documentCRUD';

interface EditPermanentAffiliationModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: PermanentAffiliationType | null;
  onSuccess: () => void;
}

const EditPermanentAffiliationModal: React.FC<
  EditPermanentAffiliationModalProps
> = ({isOpen, onClose, document, onSuccess}) => {
  const [url, setUrl] = useState(document?.url || '');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const user = appStore(state => state.user);
  const allowedAdminEmails: string[] = [
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL1,
    import.meta.env.VITE_FIREBASE_ADMIN_EMAIL2,
  ];
  const isAdmin = allowedAdminEmails.includes(user?.email || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!document || !isAdmin) return;

    setLoading(true);
    setErrorMessage('');

    try {
      // Validate URL
      if (!url.trim()) {
        setErrorMessage('URL is required');
        setLoading(false);
        return;
      }

      // Validate URL format
      try {
        new URL(url.trim());
      } catch {
        setErrorMessage('Please enter a valid URL');
        setLoading(false);
        return;
      }

      // Update document using documentCRUD
      const result = await updateDocument(
        'prospectusAndAdmission',
        document.id,
        {url: url.trim()},
        setErrorMessage,
      );

      if (result.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error updating document:', error);
      setErrorMessage('Failed to update document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrorMessage('');
    setUrl(document?.url || '');
    onClose();
  };

  if (!isOpen || !document) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Permanent Affiliation URL
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="mb-1 block text-sm font-medium text-gray-700">
              Document URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              placeholder="https://example.com/document.pdf"
              disabled={loading}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the direct URL to the permanent affiliation document
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
              disabled={loading}>
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              disabled={loading}>
              {loading ? 'Updating...' : 'Update URL'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPermanentAffiliationModal;
