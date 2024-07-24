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
    <div className="popup" data-testid="popup">
      <p>{`Choose ${selectedCount} element${selectedCount > 1 ? 's' : ''}`}</p>
      <div className="popup-buttons">
        <button onClick={onClearAll}>Delete all</button>
        <button onClick={onDownload}>Download</button>
      </div>
    </div>
  );
};

export default Popup;
