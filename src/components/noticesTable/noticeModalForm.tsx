import {appStore} from '@/appStore/appStore';
import {
  handleNoticeAdd,
  handleNoticeDelete,
  handleNoticeEdit,
  handleNoticeEditNameOnly,
} from '@/helpers/noticeTableHelpers.tsx/noticeTableUpdateHelpers';
import {CarouselModeType, NoticeBoardType} from '@/types/homeTypes';
import {validatePDFType} from '@/utils/fileValidation';
import React, {useEffect, useRef, useState} from 'react';

type PropTypes = {
  mode: CarouselModeType;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNotice: NoticeBoardType;
  setNotices: (notices: NoticeBoardType[] | []) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};
export const NoticeModalForm = React.memo(
  ({
    mode,
    setOpenModal,
    selectedNotice,
    setNotices,
    loading,
    setLoading,
    uploading,
    setUploading,
    setProcessSuccess,
  }: PropTypes) => {
    const {notices} = appStore.getState();

    const [formValues, setFormValues] = useState<NoticeBoardType>({
      id: selectedNotice.id,
      name: mode === 'ADD' ? '' : selectedNotice.name,
      url: mode === 'ADD' ? '' : selectedNotice.url,
      public_id: mode === 'ADD' ? '' : selectedNotice.public_id,
      createdAt: mode === 'ADD' ? null : selectedNotice.createdAt,
    });
    const [uploadError, setUploadError] = useState<string>('');
    const [tempFile, setTempFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [nameonly, setNameOnly] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setFormValues(prev => ({
        ...prev,
        [name]: value,
      }));
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const {error, message} = validatePDFType(file);
      if (error) {
        setUploadError(message);
        return;
      } else {
        setTempFile(file);
        setUploadError('');
      }
    };

    useEffect(() => {
      if (tempFile) {
        const fileURL = URL.createObjectURL(tempFile);

        // Cleanup
        return () => {
          URL.revokeObjectURL(fileURL);
        };
      }
    }, [tempFile]);

    const isDuplicate = notices.some(
      n => n.name.trim() === formValues.name.trim(),
    );
    const totalNotices = notices.length;
    const maxLength = totalNotices >= 30;

    const handleOnAdd = () => {
      if (maxLength) {
        setUploading(false);
        setLoading(false);
        setUploadError('Max Limit Reached.Please delete! (SL 30)');
        return;
      }
      if (!tempFile) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please select a file!');
        return;
      }
      if (!formValues.name) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please enter file name!');
        return;
      }
      // ✅ Duplicate check before Firestore write

      if (isDuplicate) {
        setUploading(false);
        setLoading(false);
        setUploadError('Duplicate Notice name! Please try another name.');
        return;
      }
      setTimeout(() => {
        handleNoticeAdd(
          setOpenModal,
          formValues,
          setLoading,
          tempFile,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          notices,
          setNotices,
        );
      }, 200);
    };
    const handleOnEdit = () => {
      if (nameonly) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please unselect Name Only!');
        return;
      }
      if (!tempFile) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please select a file!');
        return;
      }
      if (!formValues.name) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please enter file name!');
        return;
      }
      setTimeout(() => {
        handleNoticeEdit(
          setOpenModal,
          formValues,
          setLoading,
          tempFile,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          notices,
          setNotices,
        );
      }, 200);
    };
    const handleOnDelete = () => {
      if (
        !formValues.name ||
        !formValues.url ||
        !formValues.public_id ||
        !formValues.id
      ) {
        setUploading(false);
        setLoading(false);
        setUploadError('File not found!');
        return;
      }
      setTimeout(() => {
        handleNoticeDelete(
          setOpenModal,
          formValues,
          setLoading,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          notices,
          setNotices,
        );
      }, 200);
    };
    const handleClose = () => {
      if (loading || uploading) {
        return;
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTempFile(null);
      setTimeout(() => {
        setOpenModal(false);
      }, 200);
    };

    const handleUploadErrorMessage = (message: string) => {
      setUploadError(message);
    };

    const handleNameONLY = () => {
      if (!nameonly) {
        setUploadError('Please select Name Only!');
        return;
      }
      if (!formValues.name) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please select a name!');
        return;
      }

      setTimeout(() => {
        handleNoticeEditNameOnly(
          setOpenModal,
          formValues,
          setLoading,
          handleUploadErrorMessage,
          setProcessSuccess,
          notices,
          setNotices,
        );
      }, 200);
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            File Name
          </label>
          <input
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter file name"
            disabled={mode === 'DELETE'}
            className="mt-1 w-full cursor-auto rounded-md border border-gray-300 p-2 shadow-sm hover:bg-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {mode === 'EDIT' && (
            <div className="align-center mt-2 flex flex-row justify-start gap-2">
              <input
                type="checkbox"
                checked={nameonly}
                onChange={e => setNameOnly(e.target.checked)}
              />
              <p className="block text-sm font-medium text-gray-700">
                Edit name only
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            {mode === 'ADD'
              ? 'Select File'
              : mode === 'EDIT'
                ? 'Edit Notice'
                : 'Delete Notice'}
          </label>
          {mode !== 'DELETE' && !nameonly && (
            <>
              <label
                htmlFor="file-upload"
                className="mt-1 h-full w-full cursor-pointer rounded-md border border-gray-300 p-2 shadow-sm transition-transform duration-180 ease-in-out hover:bg-gray-300 active:scale-95">
                Upload File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                disabled={uploading}
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </>
          )}
          {uploading && (
            <p className="mt-1 text-sm text-blue-600">Uploading...</p>
          )}
          {uploadError && (
            <p className="mt-1 text-sm text-red-500">{uploadError}</p>
          )}
          {tempFile && mode !== 'DELETE' && (
            <label className="mt-2 block text-sm font-medium text-blue-700">
              {tempFile.name}
            </label>
          )}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-180 ease-in-out hover:bg-gray-400 active:scale-95">
            Cancel
          </button>
          <button
            onClick={
              mode === 'ADD'
                ? handleOnAdd
                : mode === 'EDIT' && !nameonly
                  ? handleOnEdit
                  : mode === 'EDIT' && nameonly
                    ? handleNameONLY
                    : handleOnDelete
            }
            className="cursor-pointer rounded-md bg-[#900090] px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-purple-800 active:scale-95">
            {mode === 'ADD' ? 'Add' : mode === 'EDIT' ? 'Update' : 'Delete'}
          </button>
        </div>
      </div>
    );
  },
);
