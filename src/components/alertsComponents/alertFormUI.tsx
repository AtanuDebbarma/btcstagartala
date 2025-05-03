// FormInput.tsx
import {CarouselModeType} from '@/types/homeTypes';
import React from 'react';

type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
};

export const FormInput = React.memo(
  ({
    label,
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    type = 'text',
  }: FormInputProps) => (
    <div className="flex flex-col gap-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-1 w-full cursor-auto rounded-md border border-gray-300 p-2 shadow-sm hover:bg-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  ),
);

type FormTextareaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
};

export const FormTextarea = React.memo(
  ({
    label,
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    rows = 6,
  }: FormTextareaProps) => (
    <div className="flex flex-col gap-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-1 w-full rounded-md border border-gray-300 p-2 text-left align-top shadow-sm hover:bg-gray-300 focus:border-blue-500 focus:ring-blue-500"
        rows={rows}
      />
    </div>
  ),
);

type CheckboxWithLabelProps = {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const CheckboxWithLabel = React.memo(
  ({label, checked, onChange, disabled = false}: CheckboxWithLabelProps) => (
    <div className="align-center mt-2 flex flex-row justify-start gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={!disabled ? onChange : undefined}
      />
      <p className="block text-sm font-medium text-gray-700">{label}</p>
    </div>
  ),
);

type FileUploadProps = {
  fileName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export const FileUpload = React.memo(
  ({fileName, onChange, disabled = false, inputRef}: FileUploadProps) => (
    <>
      <label
        htmlFor="file-upload"
        className="mt-1 h-full w-full cursor-pointer rounded-md border border-gray-300 p-2 text-blue-700 shadow-sm transition-transform duration-180 ease-in-out hover:bg-gray-300 active:scale-95">
        {fileName || 'Upload File'}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        disabled={disabled}
        onChange={onChange}
        className="hidden"
        ref={inputRef}
      />
    </>
  ),
);

type LinkSectionProps = {
  linkNumber: number;
  name: string;
  url: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isActive: boolean; // Add this prop
  onToggleActive: () => void; // Add this prop
};

export const LinkSection = React.memo(
  ({
    linkNumber,
    name,
    url,
    onNameChange,
    onUrlChange,
    disabled = false,
    isActive,
    onToggleActive,
  }: LinkSectionProps) => (
    <div className="flex flex-col gap-1">
      <CheckboxWithLabel
        label={`Add Link ${linkNumber}`}
        checked={isActive}
        disabled={disabled}
        onChange={onToggleActive}
      />
      {isActive && (
        <>
          <FormInput
            label={`Link ${linkNumber} Name`}
            name={`link${linkNumber}Name`}
            value={name}
            onChange={onNameChange}
            placeholder={`Enter Link ${linkNumber} name`}
            disabled={disabled}
          />
          <FormInput
            label={`Link ${linkNumber} Url`}
            name={`link${linkNumber}Url`}
            value={url}
            onChange={onUrlChange}
            placeholder={`Enter Link ${linkNumber} url`}
            disabled={disabled}
          />
        </>
      )}
    </div>
  ),
);

type ActionButtonsProps = {
  mode: CarouselModeType;
  nameOnly: boolean;
  contentOnly: boolean;
  onCancel: () => void;
  onAction: () => void;
};

export const ActionButtons = React.memo(
  ({mode, nameOnly, contentOnly, onCancel, onAction}: ActionButtonsProps) => {
    const getActionLabel = () => {
      if (mode === 'ADD') return 'Add';
      if (mode === 'EDIT')
        return nameOnly
          ? 'Update Title'
          : contentOnly
            ? 'Update Content'
            : 'Update';
      if (mode === 'DELETE') return 'Delete';
      return 'OK';
    };

    return (
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-180 ease-in-out hover:bg-gray-400 active:scale-95">
          Cancel
        </button>
        <button
          onClick={onAction}
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-blue-500 active:scale-95">
          {getActionLabel()}
        </button>
      </div>
    );
  },
);
