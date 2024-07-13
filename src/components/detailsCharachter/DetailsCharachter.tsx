import React from 'react';
import { SearchDataType } from '../../services/types';

interface DetailsComponentProps {
  item: SearchDataType;
  onClose: () => void;
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({
  item,
  onClose,
}) => {
  return (
    <div className="details-panel">
      <h2>Character Details</h2>
      <div className="details-content">
        <img src={item.image} alt={item.name} />
        <div>
          <p>Name: {item.name}</p>
          <p>Status:{item.status}</p>
          <p>Species:{item.species}</p>
          <p>Type:{item.type || 'N/A'}</p>
          <p>Gender:{item.gender}</p>
        </div>
      </div>
      <button onClick={onClose}>Close Details</button>
    </div>
  );
};

export default DetailsComponent;
