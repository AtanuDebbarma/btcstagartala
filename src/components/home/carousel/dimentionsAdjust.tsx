import React, {useState} from 'react';
import {Dimensions} from '@/services/carousel/fetchDimentions';
import {handleDimUpdate} from '@/helpers/carouselHelpers/carouselUpdateHelpers';

type PropTypes = {
  dimensions: Dimensions;
  setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: keyof Dimensions;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder="Enter dimensions in px"
    />
  </div>
);

export const DimentionsAdjustForm = ({
  setOpenModal,
  dimensions,
  setDimensions,
  setLoading,
  setAutoPlay,
  setProcessSuccess,
}: PropTypes) => {
  const [formValues, setFormValues] = useState<Dimensions>({
    default: dimensions?.default || 350,
    minWidth_410: dimensions?.minWidth_410 || 375,
    minWidth_430: dimensions?.minWidth_430 || 400,
    minWidth_820: dimensions?.minWidth_820 || 430,
    minWidth_1024: dimensions?.minWidth_1024 || 480,
    objectFit: dimensions?.objectFit || 'cover',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: name === 'objectFit' ? value : Number(value),
    }));
  };

  const handleClose = () => {
    setAutoPlay(true);
    setOpenModal(false);
    setProcessSuccess(false);
    setLoading(false);
  };

  const handleUpdate = () => {
    handleDimUpdate(
      setOpenModal,
      formValues,
      setLoading,
      setDimensions,
      setAutoPlay,
      setProcessSuccess,
    );
  };

  const {
    default: def,
    minWidth_410,
    minWidth_430,
    minWidth_820,
    minWidth_1024,
    objectFit,
  } = formValues;

  return (
    <div className="space-y-2">
      <InputField
        label="Upto 410px"
        name="default"
        value={def}
        onChange={handleChange}
      />
      <InputField
        label="Above 410px"
        name="minWidth_410"
        value={minWidth_410}
        onChange={handleChange}
      />
      <InputField
        label="Above 430px"
        name="minWidth_430"
        value={minWidth_430}
        onChange={handleChange}
      />
      <InputField
        label="Above 820px"
        name="minWidth_820"
        value={minWidth_820}
        onChange={handleChange}
      />
      <InputField
        label="Above 1024px"
        name="minWidth_1024"
        value={minWidth_1024}
        onChange={handleChange}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Object-fit
        </label>
        <select
          name="objectFit"
          value={objectFit}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="cover">cover</option>
          <option value="contain">contain</option>
          <option value="none">none</option>
          <option value="fill">fill</option>
          <option value="stretch">stretch</option>
        </select>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleClose}
          className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Update
        </button>
      </div>
    </div>
  );
};
