import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useCharacterSelection = () => {
  const dispatch = useDispatch();
  const characters = useSelector(
    (state: RootState) => state.character.characters
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    if (e.target.checked) {
      dispatch({ type: 'ADD_CHARACTER', payload: id });
    } else {
      dispatch({ type: 'REMOVE_CHARACTER', payload: id });
    }
  };

  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_ALL_CHARACTERS' });
  };

  return {
    characters,
    handleChange,
    handleClearAll,
    selectedCount: characters.length,
  };
};

export default useCharacterSelection;
