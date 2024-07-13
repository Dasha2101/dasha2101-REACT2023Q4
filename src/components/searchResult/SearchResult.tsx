import React, { useState } from 'react';
import { SearchDataType } from '../../services/types';
import './SearchResult.css';
import Pagination from '../pagination/Pagination';
import usePagination from '../../hooks/usePagination';
// import Loading from '../loading/Loading';
import { RickAndMortyAPI } from '../../services/apiService/apiSevice';
import DetailsComponent from '../detailsCharachter/DetailsCharachter';

interface SearchResultProps {
  results: SearchDataType[];
}

const SearchResult: React.FC<SearchResultProps> = ({ results }) => {
  const { currentPage, totalPages, setCurrentPage, isLoading } = usePagination({
    initialPage: 1,
    itemsPerPage: 5,
    initialData: results,
  });

  const [selectedItem, setSelectedItem] = useState<SearchDataType | null>(null);

  const handleItemClick = async (index: number) => {
    const selectedId = index;
    try {
      const character = await RickAndMortyAPI.fetchCharacter(selectedId);
      setSelectedItem(character);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  const startIndex = (currentPage - 1) * 5;
  const paginatedResults = results.slice(startIndex, startIndex + 5);

  return (
    <div className="search-res">
      <div className="left-panel">
        {paginatedResults.map((result: SearchDataType) => (
          <div
            key={result.id}
            className="result-item"
            onClick={() => handleItemClick(result.id)}
          >
            <h3>{result.name}</h3>
            <img src={result.image} alt={result.name} />
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          total={totalPages}
          pageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className="right-panel">
        {/* {isLoading && <Loading />} */}
        {selectedItem && !isLoading && (
          <DetailsComponent item={selectedItem} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
};

export default SearchResult;
