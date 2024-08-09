import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: string = '') => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(storedValue);
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
