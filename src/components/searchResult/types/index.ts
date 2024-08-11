import { SearchDataType } from '../../../services/types';

export interface SearchResultProps {
  results: SearchDataType[];
}

export interface SearchResultProps {
  results: SearchDataType[];
  onSelectionChange: (ids: string[]) => void;
  currentPage: number;
  selectedIds: string[];
  onCharacterSelect: (id: string) => void;
  onPageChange: (page: number) => void;
}
