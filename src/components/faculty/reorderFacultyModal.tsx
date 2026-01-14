import type {FacultyWithId} from '@/types/otherTypes';
import React, {useState, useRef} from 'react';
import {updateFacultyOrder} from '@/services/backend/facultyCRUD';

type PropTypes = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  faculty: FacultyWithId[];
  onSuccess: () => void;
  title: string;
};

export const ReorderFacultyModal = ({
  openModal,
  setOpenModal,
  faculty,
  onSuccess,
  title,
}: PropTypes) => {
  const [orderedFaculty, setOrderedFaculty] =
    useState<FacultyWithId[]>(faculty);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newFaculty = [...orderedFaculty];
      const draggedItemContent = newFaculty[dragItem.current];
      newFaculty.splice(dragItem.current, 1);
      newFaculty.splice(dragOverItem.current, 0, draggedItemContent);
      setOrderedFaculty(newFaculty);
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggedIndex(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    setErrorMessage('');

    // Calculate new order values based on position
    const updates = orderedFaculty.map((member, index) => ({
      id: member.id,
      order: index,
    }));

    const result = await updateFacultyOrder(updates, setErrorMessage);

    if (result.success) {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        onSuccess();
        setOpenModal(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setOrderedFaculty(faculty);
    setOpenModal(false);
  };

  if (!openModal) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Reorder {title}
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Drag and drop faculty cards to reorder them
        </p>

        {loading && (
          <div className="mb-4 text-center text-blue-600">Saving...</div>
        )}
        {success && (
          <div className="mb-4 text-center text-green-600">
            Order updated successfully! ✓
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 text-center text-red-600">{errorMessage}</div>
        )}

        <div className="mb-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {orderedFaculty.map((member, index) => (
              <div
                key={member.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={e => e.preventDefault()}
                className={`relative flex cursor-move items-center gap-4 rounded-lg border-2 p-4 transition-all ${
                  draggedIndex === index
                    ? 'border-purple-500 opacity-50'
                    : 'border-gray-300 hover:border-purple-400'
                }`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleClose}
            disabled={loading}
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-transform duration-150 ease-in-out hover:bg-gray-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="cursor-pointer rounded-md bg-[#900090] px-4 py-2 text-white transition-transform duration-180 ease-in-out hover:bg-purple-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      </div>
    </div>
  );
};
