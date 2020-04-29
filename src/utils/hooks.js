import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUrl = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      setData(json);
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, isLoading, error];
};

export { useFetch };
