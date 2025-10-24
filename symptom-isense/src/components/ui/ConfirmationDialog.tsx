import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from './Button';

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  onConfirm,
  onCancel,
  isOpen
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex flex-col items-center">
          <FaExclamationTriangle className="text-red-600 text-4xl mb-4" />
          <p className="text-center text-lg mb-4">{message}</p>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            variant="danger"
            onClick={onConfirm}
            className="px-4 py-2"
          >
            Confirm
          </Button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;