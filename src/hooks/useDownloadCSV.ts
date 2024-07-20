import { useCallback } from 'react';
import { SearchDataType } from '../services/types';

const useDownloadCSV = (results: SearchDataType[], selectedIds: number[]) => {
  const handleDownloadCSV = useCallback(() => {
    const selectedItems = results.filter((result) =>
      selectedIds.includes(result.id)
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Name,Species,Gender,Status,Type']
        .concat(
          selectedItems.map(
            (item) =>
              `${item.name},${item.species},${item.gender},${item.status},${item.type}`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [results, selectedIds]);

  return { handleDownloadCSV };
};

export default useDownloadCSV;
