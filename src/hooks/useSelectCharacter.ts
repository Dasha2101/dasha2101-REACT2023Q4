import { useState, useEffect } from 'react';

const useCharacterSelection = (
  initialSelectedIds: string[],
  onSelectionChange: (ids: string[]) => void
) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);

  useEffect(() => {
    onSelectionChange(selectedIds);
  }, [selectedIds, onSelectionChange]);

  const handleChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  return {
    selectedIds,
    handleChange,
    handleClearAll,
  };
};

export default useCharacterSelection;
