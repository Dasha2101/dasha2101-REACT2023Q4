'use client';
import React from 'react';
import { SearchDataType } from '../../services/types';
import { SearchResultProps } from './types';
import Image from 'next/image';
import './SearchResult.css';

const SearchResult: React.FC<SearchResultProps> = ({ results }) => {
  return (
    <div className="search-res">
      <div className="panel">
        {results.length > 0 ? (
          results.map((result: SearchDataType) => (
            <div
              key={result.id}
              className="result-item"
              data-testid="result-item"
            >
              <h3>{result.name}</h3>
              <Image
                src={result.image}
                alt={result.name}
                width={500}
                height={300}
              />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
