// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isVisible: boolean;
  suggestions: string[];
}

const SuggestModal: React.FC<ModalProps> = ({ isVisible, suggestions }) => {
  if (!isVisible) return null; // Don't render modal if not visible

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10" />

      {/* Modal content */}
      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 shadow-lg z-20 max-h-60 overflow-y-auto rounded-lg">
        <ul>
          {suggestions.map((city, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {city}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SuggestModal;
