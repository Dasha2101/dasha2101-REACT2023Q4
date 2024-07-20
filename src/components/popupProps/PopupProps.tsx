import React from 'react';
import './PopupProps.css';

interface PopupProps {
  isVisible: boolean;
  selectedCount: number;
  onClearAll: () => void;
  onDownload: () => void;
}

const Popup: React.FC<PopupProps> = ({
  isVisible,
  selectedCount,
  onClearAll,
  onDownload,
}) => {
  if (!isVisible) return null;

  return (
    <div className="popup">
      <p>{`Choose ${selectedCount} elements${selectedCount > 1 ? 'a' : ''}`}</p>
      <div className="popup-buttons">
        <button onClick={onClearAll}>Delete all</button>
        <button onClick={onDownload}>Download</button>
      </div>
    </div>
  );
};

export default Popup;
