import {appStore} from '@/appStore/appStore';
import {handleEditProspectus} from '@/helpers/pdfHelpers/prospectusHelpers';
import type {ProspectusAndAdmissionFormType} from '@/types/homeTypes';
import {validatePDFType} from '@/utils/fileValidation';
import React, {useEffect, useRef, useState} from 'react';

type PropTypes = {
  selectedPDF: ProspectusAndAdmissionFormType | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  totalCount: number;
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOnHoverProspectus: React.Dispatch<React.SetStateAction<boolean>>;
  setOnHoverAdmission: React.Dispatch<React.SetStateAction<boolean>>;
};
export const EditProspectusForm = ({
  selectedPDF,
  setOpenModal,
  totalCount,
  uploading,
  setUploading,
  loading,
  setLoading,
  setProcessSuccess,
  setOnHoverProspectus,
  setOnHoverAdmission,
}: PropTypes) => {
  const formValues = selectedPDF ? selectedPDF.name : '';
  const [uploadError, setUploadError] = useState<string>('');
  const [tempFile, setTempFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const setProspectusAndAdmission = appStore(
    state => state.setProspectusAndAdmission,
  );
  const prospectusAndAdmission = appStore(
    state => state.prospectusAndAdmission,
  );

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

  const handleOnEdit = () => {
    setOnHoverProspectus(false);
    setOnHoverAdmission(false);
    if (totalCount > 5) {
      setUploading(false);
      setLoading(false);
      setUploadError('Maximum 5 documents allowed');
      setOnHoverProspectus(false);
      setOnHoverAdmission(false);
      return;
    }
    if (!tempFile) {
      setUploading(false);
      setLoading(false);
      setUploadError('Please select an file!');
      setOnHoverProspectus(false);
      setOnHoverAdmission(false);
      return;
    }
    setTimeout(() => {
      void handleEditProspectus(
        setOpenModal,
        selectedPDF,
        setLoading,
        tempFile,
        setUploading,
        handleUploadErrorMessage,
        setProcessSuccess,
        prospectusAndAdmission,
        setProspectusAndAdmission,
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
    setOnHoverProspectus(false);
    setOnHoverAdmission(false);
    setTimeout(() => {
      setOpenModal(false);
    }, 200);
  };

  const handleUploadErrorMessage = (message: string) => {
    setUploadError(message);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="mt-2 block text-sm font-medium text-gray-700">
          Edit File
        </label>
        <label className="mt-1 w-full cursor-pointer rounded-md border border-gray-300 p-2 shadow-sm hover:bg-gray-300 focus:border-blue-500 focus:ring-blue-500">
          {formValues}
        </label>
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
        {uploading && (
          <p className="mt-1 text-sm text-blue-600">Uploading...</p>
        )}
        {uploadError && (
          <p className="mt-1 text-sm text-red-500">{uploadError}</p>
        )}
      </div>

      {tempFile && (
        <label className="mt-2 block text-sm font-medium text-blue-700">
          {tempFile.name}
        </label>
      )}

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleClose}
          className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-150 ease-in-out hover:bg-gray-400 active:scale-95">
          Cancel
        </button>
        <button
          onClick={handleOnEdit}
          className="cursor-pointer rounded-md bg-[#900090] px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-purple-800 active:scale-95">
          Update
        </button>
      </div>
    </div>
  );
};
