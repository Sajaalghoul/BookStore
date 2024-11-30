import { useState, useEffect } from 'react';

const UseDebounce = (value,delay) => {
  const [debounceValue, setDebounceValue] = useState(null);
  useEffect(() => {
    const Timeout=setTimeout(() => {
      setDebounceValue(value);
}, delay);
return()=>clearTimeout(Timeout);
  }, [value,delay]); 

  return debounceValue;
};

export default UseDebounce;
