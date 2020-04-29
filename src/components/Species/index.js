import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { concatanateResult, fetchData } from "../../utils";

const Species = ({ name }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [conservationMeasures, setConservationMeasures] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConservationMeasures = async () => {
    const response = await fetchData(`/measures/species/name/${name}`);

    setConservationMeasures(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!conservationMeasures && inView) {
      fetchConservationMeasures();
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <h4>{name}</h4>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {conservationMeasures &&
            conservationMeasures.result &&
            concatanateResult(conservationMeasures.result, "title")}
        </p>
      )}
    </div>
  );
};

export default Species;
