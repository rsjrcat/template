import { useState, useEffect } from 'react';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export const useAsyncOperation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (operation) => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute };
};