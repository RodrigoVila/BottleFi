import { useState } from "react";

export const useLocalStorage = (key: string, initialValue?: string | object) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error while getting data from Localstorage: ", error);
        return initialValue;
      }
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: string | object) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error("Error while saving data to Localstorage: ", error);
    }
  };

  const clearLocalStorage = () => window.localStorage.clear();
  return [storedValue, setValue, clearLocalStorage];
};
