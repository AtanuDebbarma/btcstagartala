import {appStore} from '@/appStore/appStore';
import {AlertsType, CarouselModeType} from '@/types/homeTypes';
import {isValidWebsiteUrl, validatePDFType} from '@/utils/fileValidation';
import React, {useEffect, useRef, useState} from 'react';
import {
  FormInput,
  CheckboxWithLabel,
  FormTextarea,
  FileUpload,
  LinkSection,
  ActionButtons,
} from './alertFormUI';
import {
  handleAlertAdd,
  handleAlertDelete,
  handleAlertEdit,
  handleAlertEditContentOnly,
  handleAlertEditNameOnly,
} from '@/helpers/alertHelpers/alertUpdateHelpers';

type PropTypes = {
  mode: CarouselModeType;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAlert: AlertsType;
  setAlerts: (alerts: AlertsType[] | []) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AlertModalForm = React.memo(
  ({
    mode,
    setOpenModal,
    selectedAlert,
    setAlerts,
    loading,
    setLoading,
    uploading,
    setUploading,
    setProcessSuccess,
  }: PropTypes) => {
    const {alerts} = appStore.getState();

    const [formValues, setFormValues] = useState<AlertsType>({
      id: mode === 'ADD' ? '' : selectedAlert.id,
      title: mode === 'ADD' ? '' : selectedAlert.title,
      content: mode === 'ADD' ? '' : selectedAlert.content,
      fileName: mode === 'ADD' ? '' : selectedAlert.fileName,
      fileURL: mode === 'ADD' ? '' : selectedAlert.fileURL,
      file_public_id: mode === 'ADD' ? '' : selectedAlert.file_public_id,
      link1Name: mode === 'ADD' ? '' : selectedAlert.link1Name,
      link1Url: mode === 'ADD' ? '' : selectedAlert.link1Url,
      link2Name: mode === 'ADD' ? '' : selectedAlert.link2Name,
      link2Url: mode === 'ADD' ? '' : selectedAlert.link2Url,
      createdAt: mode === 'ADD' ? null : selectedAlert.createdAt,
    });
    const [uploadError, setUploadError] = useState<string>('');
    const [tempFile, setTempFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [nameonly, setNameOnly] = useState<boolean>(false);
    const [contentOnly, setContentOnly] = useState<boolean>(false);
    const [fileOne, setFileOne] = useState<boolean>(false);
    const [linkOne, setLinkOne] = useState<boolean>(false);
    const [linkTwo, setLinkTwo] = useState<boolean>(false);

    const isValidOne = isValidWebsiteUrl(formValues.link1Url.trim());
    const isValidTwo = isValidWebsiteUrl(formValues.link2Url.trim());

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
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

    useEffect(() => {
      if (mode === 'EDIT') {
        if (
          selectedAlert.fileURL &&
          selectedAlert.fileName &&
          selectedAlert.file_public_id
        ) {
          setFileOne(true);
        }
        if (selectedAlert.link1Url && selectedAlert.link1Name) {
          setLinkOne(true);
        }
        if (selectedAlert.link2Url && selectedAlert.link2Name) {
          setLinkTwo(true);
        }
      }
    }, [mode, selectedAlert]);

    const isDuplicate = alerts.some(
      n => n.title.trim() === formValues.title.trim(),
    );
    const totalNotices = alerts.length;
    const maxLength = totalNotices >= 7;

    const handleOnAdd = () => {
      if (maxLength) {
        setUploading(false);
        setLoading(false);
        setUploadError('Max Limit Reached.Please delete! (SL 7)');
        return;
      }
      if (
        (linkOne && (!formValues.link1Url || !formValues.link1Name)) ||
        (linkTwo && (!formValues.link2Url || !formValues.link2Name))
      ) {
        setUploading(false);
        setLoading(false);
        setUploadError('Links cannot be empty! Please unselect link checkbox!');
        return;
      }
      if (fileOne && !tempFile) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please select a file!');
        return;
      }
      if (!formValues.title || !formValues.content) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please enter Alert title or content!');
        return;
      }
      // ✅ Duplicate check before Firestore write

      if (isDuplicate) {
        setUploading(false);
        setLoading(false);
        setUploadError('Duplicate Notice name! Please try another name.');
        return;
      }
      if ((linkOne && !isValidOne) || (linkTwo && !isValidTwo)) {
        setUploading(false);
        setLoading(false);
        setUploadError(
          'Please enter a valid link. Links must start with https:// or http://',
        );
        return;
      }
      setTimeout(() => {
        handleAlertAdd(
          setOpenModal,
          formValues,
          setLoading,
          tempFile,
          fileOne,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          alerts,
          setAlerts,
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
      if (
        (linkOne && (!formValues.link1Url || !formValues.link1Name)) ||
        (linkTwo && (!formValues.link2Url || !formValues.link2Name))
      ) {
        setUploading(false);
        setLoading(false);
        setUploadError('Links cannot be empty! Please unselect link checkbox!');
        return;
      }
      if (
        fileOne &&
        !tempFile &&
        !selectedAlert.fileURL &&
        !selectedAlert.fileName
      ) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please select a file!');
        return;
      }
      if (!formValues.title || !formValues.content) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please enter Alert title or content!');
        return;
      }
      if ((linkOne && !isValidOne) || (linkTwo && !isValidTwo)) {
        setUploading(false);
        setLoading(false);
        setUploadError(
          'Please enter a valid link. Links must start with https:// or http://',
        );
        return;
      }
      setTimeout(() => {
        handleAlertEdit(
          setOpenModal,
          formValues,
          setLoading,
          tempFile,
          fileOne,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          alerts,
          setAlerts,
        );
      }, 200);
    };
    const handleOnDelete = () => {
      if (!formValues.title || !formValues.content || !formValues.id) {
        setUploading(false);
        setLoading(false);
        setUploadError('No alert Found!');
        return;
      }
      setTimeout(() => {
        handleAlertDelete(
          setOpenModal,
          formValues,
          setLoading,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          alerts,
          setAlerts,
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
        setUploadError('Please select Title Only!');
        return;
      }
      if (!formValues.title) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please write a title!');
        return;
      }

      setTimeout(() => {
        handleAlertEditNameOnly(
          setOpenModal,
          formValues,
          setLoading,
          nameonly,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          alerts,
          setAlerts,
        );
      }, 200);
    };

    const handleContentONLY = () => {
      if (!contentOnly) {
        setUploadError('Please select Content Only!');
        return;
      }
      if (!formValues.content) {
        setUploading(false);
        setLoading(false);
        setUploadError('Please write content!');
        return;
      }

      setTimeout(() => {
        handleAlertEditContentOnly(
          setOpenModal,
          formValues,
          setLoading,
          contentOnly,
          setUploading,
          handleUploadErrorMessage,
          setProcessSuccess,
          alerts,
          setAlerts,
        );
      }, 200);
    };

    const isDisabled = nameonly || contentOnly;
    return (
      <div className="flex w-full flex-col space-y-4 pb-10 sm:w-[95%] lg:w-[85%]">
        {!contentOnly && (
          <FormInput
            label="Alert Title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Enter alert title"
            disabled={mode === 'DELETE'}
          />
        )}

        {mode === 'EDIT' && !contentOnly && (
          <CheckboxWithLabel
            label="Edit name only"
            checked={nameonly}
            disabled={contentOnly ? true : false}
            onChange={e => {
              setContentOnly(false);
              setNameOnly(e.target.checked);
            }}
          />
        )}

        {!nameonly && (
          <FormTextarea
            label="Alert Content"
            name="content"
            value={formValues.content}
            onChange={handleChange}
            placeholder="Enter alert content"
            disabled={mode === 'DELETE'}
          />
        )}

        {mode === 'EDIT' && !nameonly && (
          <CheckboxWithLabel
            label="Edit content only"
            checked={contentOnly}
            disabled={nameonly ? true : false}
            onChange={e => {
              setNameOnly(false);
              setContentOnly(e.target.checked);
            }}
          />
        )}

        {mode !== 'DELETE' && !isDisabled && (
          <CheckboxWithLabel
            label="Add File"
            disabled={isDisabled}
            checked={fileOne}
            onChange={e => setFileOne(e.target.checked)}
          />
        )}
        {mode !== 'DELETE' && fileOne && !isDisabled && (
          <FormInput
            label="Document Name"
            name="fileName"
            value={formValues.fileName}
            onChange={handleChange}
            placeholder="Enter Document Name"
          />
        )}
        {mode !== 'DELETE' && fileOne && !isDisabled && (
          <FileUpload
            fileName={selectedAlert.fileName}
            onChange={handleFileChange}
            disabled={uploading}
            inputRef={fileInputRef}
          />
        )}

        {tempFile && mode !== 'DELETE' && !isDisabled && (
          <label className="mt-0 block text-sm font-medium text-blue-700">
            {tempFile.name}
          </label>
        )}

        {!isDisabled && (
          <LinkSection
            linkNumber={1}
            name={formValues.link1Name}
            url={formValues.link1Url}
            onNameChange={handleChange}
            onUrlChange={handleChange}
            disabled={mode === 'DELETE' || isDisabled}
            isActive={linkOne}
            onToggleActive={() => setLinkOne(!linkOne)}
          />
        )}

        {!isDisabled && (
          <LinkSection
            linkNumber={2}
            name={formValues.link2Name}
            url={formValues.link2Url}
            onNameChange={handleChange}
            onUrlChange={handleChange}
            disabled={mode === 'DELETE' || isDisabled}
            isActive={linkTwo}
            onToggleActive={() => setLinkTwo(!linkTwo)}
          />
        )}

        {uploading && (
          <p className="mt-1 text-sm text-blue-600">Uploading...</p>
        )}
        {uploadError && (
          <p className="mt-1 text-sm text-red-500">{uploadError}</p>
        )}

        <ActionButtons
          mode={mode}
          nameOnly={nameonly}
          contentOnly={contentOnly}
          onCancel={handleClose}
          onAction={
            mode === 'ADD'
              ? handleOnAdd
              : mode === 'EDIT' && !nameonly
                ? handleOnEdit
                : mode === 'EDIT' && nameonly
                  ? handleNameONLY
                  : mode === 'EDIT' && contentOnly
                    ? handleContentONLY
                    : handleOnDelete
          }
        />
      </div>
    );
  },
);
