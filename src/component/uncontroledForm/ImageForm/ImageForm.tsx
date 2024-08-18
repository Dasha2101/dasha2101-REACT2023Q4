import React from 'react';
import useImageUpload from '../../../hooks/useImageUpload';
import './ImageForm.css';

const ImageForm: React.FC = () => {
  const { handleFileChange, error } = useImageUpload();

  return (
    <div className="image-form-container">
      <label htmlFor="imageUpload">Image:</label>
      <input
        type="file"
        id="imageUpload"
        accept=".png, .jpeg, .jpg"
        onChange={handleFileChange}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ImageForm;
