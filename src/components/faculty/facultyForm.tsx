import type {FacultyDocument} from '@/types/otherTypes';
import React, {useState} from 'react';

type FacultyFormProps = {
  initialData?: Partial<FacultyDocument>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading: boolean;
  errorMessage: string;
  mode: 'add' | 'edit';
};

export const FacultyForm = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  errorMessage,
  mode,
}: FacultyFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    degrees: initialData?.degrees || '',
    position: initialData?.position || '',
    image: initialData?.image || '',
    type: initialData?.type || 'professor',
    designation: initialData?.details?.designation || '',
    category: initialData?.details?.category || '',
    address: initialData?.details?.address || '',
    contact: initialData?.details?.contact || '',
    email: initialData?.details?.email || '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const facultyData = {
      name: formData.name,
      degrees: formData.degrees || undefined,
      position: formData.position,
      image: formData.image,
      type: formData.type,
      details: {
        designation: formData.designation,
        category: formData.category || undefined,
        address: formData.address,
        contact: formData.contact,
        email: formData.email || undefined,
      },
    };

    onSubmit(facultyData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter full name"
          />
        </div>

        {/* Degrees */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Degrees
          </label>
          <input
            type="text"
            name="degrees"
            value={formData.degrees}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., M.Tech (CSE), B.Tech (CSE)"
          />
        </div>

        {/* Position */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Position *
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Assistant Professor"
          />
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="principal">Principal</option>
            <option value="professor">Professor</option>
            <option value="non-teaching">Non-Teaching Staff</option>
            <option value="guest">Guest Faculty</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Image URL *
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Designation */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Designation *
          </label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Asst. Prof. (IT)"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Permanent, ADHOC"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={loading}
            rows={2}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter full address"
          />
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Contact *
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="+91-1234567890"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="email@example.com"
          />
        </div>
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <div className="flex justify-center space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="cursor-pointer rounded-md bg-gray-300 px-6 py-2 text-gray-700 transition-transform duration-150 ease-in-out hover:bg-gray-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-md bg-blue-600 px-6 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-blue-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          {mode === 'add' ? 'Add Faculty' : 'Update Faculty'}
        </button>
      </div>
    </form>
  );
};
