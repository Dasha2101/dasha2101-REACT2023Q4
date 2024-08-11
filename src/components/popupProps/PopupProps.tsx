import React from 'react';
import styles from './PopupProps.module.css';

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
    <div className={styles['popup']} data-testid="popup">
      <p
        className={styles['text']}
      >{`Choose ${selectedCount} element${selectedCount > 1 ? 's' : ''}`}</p>
      <div id="popup-buttons">
        <button id="button-popup" onClick={onClearAll}>
          Delete all
        </button>
        <button id="button-popup" onClick={onDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Popup;
