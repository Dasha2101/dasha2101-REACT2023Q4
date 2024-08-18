import { useDispatch } from 'react-redux';
import { ChangeEvent, useState } from 'react';
import { setImageBase64 } from '../redux/imageSlice/ImageSlice';

const useImageUpload = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedFormat = ['.png', '.jpg', '.jpeg'];
    const fileExtension = file.name
      .slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2)
      .toLowerCase();
    if (!allowedFormat.includes(`.${fileExtension}`)) {
      setError('Only PNG/JPG/JPEG formats allowe');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      dispatch(setImageBase64(base64));
      setError(null);
    };

    reader.readAsDataURL(file);
  };

  return { handleFileChange, error };
};

export default useImageUpload;
