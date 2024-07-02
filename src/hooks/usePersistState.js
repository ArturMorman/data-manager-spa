import { useEffect, useState } from 'react'

export const usePersistState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const persistedState = window.localStorage.getItem(key);
      return persistedState !== null ? JSON.parse(persistedState) : defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};