import { useState, useEffect } from 'react';

const UseFetch = (url, dependency = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      // If no URL is provided, reset states
      setData([]);
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        console.log(url);
        if (!response.ok) {
          throw new Error('Could not fetch the data for that resource');
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (err) {
        console.log("mydata",data);
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
