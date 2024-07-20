import React from 'react';
import './PopupProps.css';

interface PopupProps {
  isVisible: boolean;
  selectedCount: number;
  onClearAll: () => void;
}

const Popup: React.FC<PopupProps> = ({
  isVisible,
  selectedCount,
  onClearAll,
}) => {
  if (!isVisible) return null;

  return (
    <div className="popup">
      <p>{`Выбрано ${selectedCount} элемент${selectedCount > 1 ? 'a' : ''}`}</p>
      <div className="popup-buttons">
        <button onClick={onClearAll}>Delete all</button>
        <button>Download</button>
      </div>
    </div>
  );
};

export default Popup;
