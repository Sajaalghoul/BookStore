import { useState, useEffect } from 'react';

const UseFetch = (url, dependency = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Could not fetch the data for that resource');
        }
        const data = await response.json();
        console.log(data);
        setData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, Array.isArray(dependency) ? dependency : []); 

  return { data, isLoading, error };
};

export default UseFetch;
