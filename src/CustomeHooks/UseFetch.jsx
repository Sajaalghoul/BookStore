
import { useState, useEffect, useCallback } from "react";

const UseFetch = (url, dependency = [], method = "GET", headers = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

const callApi = useCallback(
    async (customUrl = url, options = {}) => {
      console.log("callback");
      try {
        setIsLoading(true);
        const response = await fetch(customUrl, {
          method: options.method || method, // Default to provided method
          headers: {
            ...headers,
            ...options.headers, // Merge additional headers
          },
          body: options.body ? JSON.stringify(options.body) : null, // Include body if needed
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized access. Please login.");
          } else if (response.status === 403) {
            throw new Error("Forbidden access. You do not have permission.");
          } else {
            throw new Error("Could not fetch the data for that resource");
          }
        }
        const result = await response.json();
        setError(null);
        setData(result);
        return result; // Return response data for manual calls
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        
      }
    },
    [url, headers, method] // Dependencies for callback
  );

  // auto fetch on url change
  useEffect(() => {
    if (!url) {
      setData([]);
      return;
    }
    callApi();
  }, [url,...dependency]);

  return { data, isLoading, error, callApi };
};

export default UseFetch;
