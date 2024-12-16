import { useState, useEffect } from 'react';

const UseFetch = (url, dependency = [], method = "GET", headers = {}) => {
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
        const response = await fetch(url, {
          method: method,  // Use the dynamic method here
          headers: {
            ...headers, // Include custom headers
          },
        });

        if (!response.ok) {
          // Handle different response status codes
          if (response.status === 401) {
            throw new Error("Unauthorized access. Please login.");
          } else if (response.status === 403) {
            throw new Error("Forbidden access. You do not have permission.");
          } else {
            throw new Error("Could not fetch the data for that resource");
          }
        }

        const data = await response.json();
        setData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [...dependency]);  // Watching the dependency array

  return { data, isLoading, error };
};

export default UseFetch;
