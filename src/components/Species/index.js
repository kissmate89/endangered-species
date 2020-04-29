import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { BASE_URL } from "../../constants";

const concatanateResult = (result) =>
  result.reduce(
    (acc, curr, idx) =>
      acc + `${curr.title}${idx + 1 < result.length ? ", " : ""}`,
    ""
  );

const Species = ({ name }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUrl = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/measures/species/name/${name}?token=${process.env.IUCN_TOKEN}`
      );
      const json = await response.json();

      setData(json);
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!data && inView) {
      fetchUrl();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <h4>{name}</h4>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{data && data.result && concatanateResult(data.result)}</p>
      )}
      {!isLoading && error && <p>{error}</p>}
    </div>
  );
};

export default Species;
