import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [dbValue, setDbValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDbValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return dbValue;
}
