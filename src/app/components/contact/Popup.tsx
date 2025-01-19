import React from 'react';

interface PopupProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Popup: React.FC<PopupProps> = ({ message, onClose, duration }) => {
  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-2 text-sm text-yellow-500 hover:underline"
      >
        Close
      </button>
    </div>
  );
};

export default Popup;
