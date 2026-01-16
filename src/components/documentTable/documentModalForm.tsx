import {appStore} from '@/appStore/appStore';
import type {AICTEDocumentType} from '@/types/aicteTypes';
import React, {useState} from 'react';
import {
  addDocument,
  updateDocument,
  deleteDocument,
} from '@/services/backend/documentCRUD';

type CollectionType =
  | 'aicte'
  | 'iqac'
  | 'dhe'
  | 'academic-calendar'
  | 'misc-documents'
  | 'help-desk'
  | 'aishe'
  | 'committee-cells'
  | 'results';

type DocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: any;
};

type PropTypes = {
  collectionType: CollectionType;
  mode: 'ADD' | 'EDIT' | 'DELETE';
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDocument: DocumentType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

export const DocumentModalForm = React.memo(
  ({
    collectionType,
    mode,
    setOpenModal,
    selectedDocument,
    setLoading,
    setProcessSuccess,
    loading,
  }: PropTypes) => {
    const [formValues, setFormValues] = useState<DocumentType>({
      id: selectedDocument.id,
      name: mode === 'ADD' ? '' : selectedDocument.name,
      url: mode === 'ADD' ? '' : selectedDocument.url,
      createdAt: mode === 'ADD' ? null : selectedDocument.createdAt,
    });
    const [uploadError, setUploadError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setFormValues(prev => ({
        ...prev,
        [name]: value,
      }));
    };

    const getDocumentsFromStore = (): DocumentType[] => {
      const state = appStore.getState();
      switch (collectionType) {
        case 'aicte':
          return state.aicteDocuments as DocumentType[];
        case 'misc-documents':
          return state.miscDocuments as DocumentType[];
        case 'results':
          return state.results as DocumentType[];
        // Add other collection types as they are implemented
        default:
          return [];
      }
    };

    const setDocumentsInStore = async (documents: DocumentType[]) => {
      const state = appStore.getState();
      switch (collectionType) {
        case 'aicte':
          await state.setAICTEDocuments(documents as AICTEDocumentType[]);
          break;
        case 'misc-documents':
          await state.setMiscDocuments(documents);
          break;
        case 'results':
          await state.setResults(documents);
          break;
        // Add other collection types as they are implemented
      }
    };

    const documents = getDocumentsFromStore();

    const isDuplicate = documents.some(
      d => d.name.trim() === formValues.name.trim() && d.id !== formValues.id,
    );

    const handleUploadErrorMessage = (message: string) => {
      setUploadError(message);
    };

    const handleOnAdd = async () => {
      setLoading(true);
      setUploadError('');

      if (!formValues.name.trim()) {
        setLoading(false);
        setUploadError('Please enter document name!');
        return;
      }

      if (!formValues.url.trim()) {
        setLoading(false);
        setUploadError('Please enter document URL!');
        return;
      }

      // Basic URL validation
      try {
        new URL(formValues.url);
      } catch {
        setLoading(false);
        setUploadError('Please enter a valid URL!');
        return;
      }

      if (isDuplicate) {
        setLoading(false);
        setUploadError('Duplicate document name! Please try another name.');
        return;
      }

      try {
        const result = await addDocument(
          collectionType,
          {
            name: formValues.name,
            url: formValues.url,
          },
          handleUploadErrorMessage,
        );

        if (result.success && result.data) {
          const newDoc = result.data;
          const updatedDocuments = [...documents, newDoc];
          await setDocumentsInStore(updatedDocuments);
          setProcessSuccess(true);
          setTimeout(() => {
            setOpenModal(false);
          }, 1500);
        } else {
          setLoading(false);
          setUploadError(
            result.message || 'Failed to add document. Please try again.',
          );
        }
      } catch {
        setLoading(false);
        setUploadError('Failed to add document. Please try again.');
      }
    };

    const handleOnEdit = async () => {
      setLoading(true);
      setUploadError('');

      if (!formValues.name.trim()) {
        setLoading(false);
        setUploadError('Please enter document name!');
        return;
      }

      if (!formValues.url.trim()) {
        setLoading(false);
        setUploadError('Please enter document URL!');
        return;
      }

      // Basic URL validation
      try {
        new URL(formValues.url);
      } catch {
        setLoading(false);
        setUploadError('Please enter a valid URL!');
        return;
      }

      if (isDuplicate) {
        setLoading(false);
        setUploadError('Duplicate document name! Please try another name.');
        return;
      }

      try {
        const result = await updateDocument(
          collectionType,
          formValues.id,
          {
            name: formValues.name,
            url: formValues.url,
          },
          handleUploadErrorMessage,
        );

        if (result.success) {
          const updatedDocuments = documents.map(doc =>
            doc.id === formValues.id
              ? {...doc, name: formValues.name, url: formValues.url}
              : doc,
          );
          await setDocumentsInStore(updatedDocuments);
          setProcessSuccess(true);
          setTimeout(() => {
            setOpenModal(false);
          }, 1500);
        } else {
          setLoading(false);
          setUploadError(
            result.message || 'Failed to update document. Please try again.',
          );
        }
      } catch {
        setLoading(false);
        setUploadError('Failed to update document. Please try again.');
      }
    };

    const handleOnDelete = async () => {
      setLoading(true);
      setUploadError('');

      if (!formValues.id) {
        setLoading(false);
        setUploadError('Document not found!');
        return;
      }

      try {
        const result = await deleteDocument(
          collectionType,
          formValues.id,
          handleUploadErrorMessage,
        );

        if (result.success) {
          const updatedDocuments = documents.filter(
            doc => doc.id !== formValues.id,
          );
          await setDocumentsInStore(updatedDocuments);
          setProcessSuccess(true);
          setTimeout(() => {
            setOpenModal(false);
          }, 1500);
        } else {
          setLoading(false);
          setUploadError(
            result.message || 'Failed to delete document. Please try again.',
          );
        }
      } catch {
        setLoading(false);
        setUploadError('Failed to delete document. Please try again.');
      }
    };

    const handleClose = () => {
      if (loading) {
        return;
      }
      setTimeout(() => {
        setOpenModal(false);
      }, 200);
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Document Name
          </label>
          <input
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter document name"
            disabled={mode === 'DELETE'}
            className="mt-1 w-full cursor-auto rounded-md border border-gray-300 p-2 shadow-sm hover:bg-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Document URL
          </label>
          <input
            name="url"
            value={formValues.url}
            onChange={handleChange}
            placeholder="Enter PDF URL (e.g., https://example.com/document.pdf)"
            disabled={mode === 'DELETE'}
            className="mt-1 w-full cursor-auto rounded-md border border-gray-300 p-2 shadow-sm hover:bg-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {uploadError && (
          <p className="mt-1 text-sm text-red-500">{uploadError}</p>
        )}

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleClose}
            disabled={loading}
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-180 ease-in-out hover:bg-gray-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
            Cancel
          </button>
          <button
            onClick={
              mode === 'ADD'
                ? handleOnAdd
                : mode === 'EDIT'
                  ? handleOnEdit
                  : handleOnDelete
            }
            disabled={loading}
            className="cursor-pointer rounded-md bg-[#900090] px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-purple-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
            {mode === 'ADD' ? 'Add' : mode === 'EDIT' ? 'Update' : 'Delete'}
          </button>
        </div>
      </div>
    );
  },
);
