import React, { useState, useEffect } from 'react';
import { SearchDataType } from '../../services/types';
import Pagination from '../pagination/Pagination';
import usePagination from '../../hooks/usePagination';
import { useNavigate } from 'react-router-dom';
import { SearchResultProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Popup from '../popupProps/PopupProps';
import './SearchResult.css';

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  onItemClick,
  currentPage,
}) => {
  const itemsPerPage = 5;
  const { setCurrentPage } = usePagination({
    initialPage: currentPage,
    itemsPerPage: 5,
    initialData: results,
  });

  const [selectedCount, setSelectedCount] = useState(0);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const nextPageUrl = page === 1 ? '/search' : `/search/${page}`;
    navigate(nextPageUrl);
  };

  const handleItemClick = (id: string) => {
    onItemClick(id, currentPage);
  };

  const dispatch = useDispatch();
  const characters = useSelector(
    (state: RootState) => state.character.characters
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value); // Преобразование значения в число
    if (e.target.checked) {
      dispatch({ type: 'ADD_CHARACTER', payload: id });
    } else {
      dispatch({ type: 'REMOVE_CHARACTER', payload: id });
    }
  };

  useEffect(() => {
    setSelectedCount(characters.length);
  }, [characters]);

  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_ALL_CHARACTERS' });
    setSelectedCount(0);
  };

  return (
    <div className="search-res">
      <div className="panel">
        {paginatedResults.length > 0 ? (
          paginatedResults.map((result: SearchDataType) => (
            <div
              key={result.id}
              className="result-item"
              onClick={() => handleItemClick(String(result.id))}
              data-testid="result-item"
            >
              <h3>{result.name}</h3>
              <img src={result.image} alt={result.name} />
              <input
                type="checkbox"
                name="character"
                onChange={handleChange}
                value={result.id}
                checked={characters.includes(result.id)}
              />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
        <Pagination
          currentPage={currentPage}
          total={Math.ceil(results.length / itemsPerPage)}
          onChangePage={handlePageChange}
        />
      </div>
      {selectedCount > 0 && (
        <Popup
          isVisible={true}
          selectedCount={selectedCount}
          onClearAll={handleClearAll}
        />
      )}
    </div>
  );
};

export default SearchResult;
