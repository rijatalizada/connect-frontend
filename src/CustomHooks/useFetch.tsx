import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios'

const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error : any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return [ data, loading, error ];
};

export default useFetch;
