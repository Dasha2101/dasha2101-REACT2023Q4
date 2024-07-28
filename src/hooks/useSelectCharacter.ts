import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  addCharacter,
  removeCharacter,
  clearAllCharacters,
} from '../redux/characterSelSlice';

const useCharacterSelection = () => {
  const dispatch = useDispatch();
  const characters = useSelector(
    (state: RootState) => state.characterSelection.characters
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    if (e.target.checked) {
      dispatch(addCharacter(id));
    } else {
      dispatch(removeCharacter(id));
    }
  };

  const handleClearAll = () => {
    dispatch(clearAllCharacters());
  };

  return {
    characters,
    handleChange,
    handleClearAll,
    selectedCount: characters.length,
  };
};

export default useCharacterSelection;
