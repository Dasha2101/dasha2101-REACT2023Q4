import { useCallback } from 'react';
import { saveAs } from 'file-saver';
import { SearchDataType } from '../services/types';

const useDownloadCSV = (results: SearchDataType[], selectedIds: number[]) => {
  const handleDownloadCSV = useCallback(() => {
    const selectedItems = results.filter((result) =>
      selectedIds.includes(result.id)
    );

    const csvContent = ['Name, Species, Gender, Status, Type']
      .concat(
        selectedItems.map(
          (item) =>
            `${item.name},${item.species},${item.gender},${item.status},${item.type}`
        )
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_characters.csv`);
  }, [results, selectedIds]);

  return { handleDownloadCSV };
};

export default useDownloadCSV;
