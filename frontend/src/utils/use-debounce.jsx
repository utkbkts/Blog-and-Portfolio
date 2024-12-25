import { useEffect, useState } from "react";
//özelleştirilmiş hook örneği
export const useDebounce = (value, delay) => {
  const [useDebounceValue, setUseDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setUseDebounceValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return useDebounceValue;
};
