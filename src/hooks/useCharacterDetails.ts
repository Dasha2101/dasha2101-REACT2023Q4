import { useEffect, useState } from 'react';
import { useFetchCharacterQuery } from '../services/rtkApi';
import { SearchDataType } from '../services/types';
import { useNavigate } from 'react-router-dom';
import { UseCharacterDetailsProps } from '../components/detailsCharachter/types';

const useCharacterDetails = ({ id, onClose }: UseCharacterDetailsProps) => {
  const [isLoading, setLoading] = useState(true);
  const [character, setCharacter] = useState<SearchDataType | null>(null);
  const navigate = useNavigate();

  const { data, isFetching, error } = useFetchCharacterQuery(Number(id));

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
    } else {
      if (data) {
        setLoading(true);
        setTimeout(() => {
          setCharacter(data);
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    }

    if (error) {
      console.error('Error fetching character:', error);
      setLoading(false);
    }
  }, [data, isFetching, error]);

  const handleClose = () => {
    navigate('/');
    onClose();
  };

  return { isLoading, character, handleClose };
};

export default useCharacterDetails;
