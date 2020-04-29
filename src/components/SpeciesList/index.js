import React, { useEffect, useState, Fragment } from "react";

import { fetchData } from "../../utils";

import ClassFilteredSpeciesList from "../ClassFilteredSpeciesList";
import Species from "../Species";

const FILTER_KEYS = ["CR"];

const SpeciesList = ({ region }) => {
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpecies = async () => {
    const response = await fetchData(
      // `/species/region/${region.identifier}/page/0`
      "/species/region/europe/page/0"
    );

    const filteredSpecies = response.result.filter((item) =>
      FILTER_KEYS.some((keys) => keys === item.category)
    );

    setSpecies(filteredSpecies);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!species && region) {
      fetchSpecies();
    }
  }, [region, species]);

  if (isLoading) {
    return <p>Data is loading...</p>;
  }

  if (!isLoading && species && species.length === 0) {
    return <h3>There are no species found</h3>;
  }

  return (
    <Fragment>
      <ClassFilteredSpeciesList species={species} />

      {species && (
        <Fragment>
          <h2>Critically Endangered Species {region && `- ${region.name}`}</h2>
          {species.map((item) => (
            <Species key={item.scientific_name} name={item.scientific_name} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default SpeciesList;
