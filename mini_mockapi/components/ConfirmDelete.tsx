import React from "react";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
