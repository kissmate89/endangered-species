import React, { useEffect, useState } from "react";

import Species from "../Species";

import mockData from "./speciesMockData.json";

const FILTER_KEYS = ["CR"];
const SPECIES_CLASSES = ["MAMMALIA"];

const SpeciesList = () => {
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const filteredSpecies = mockData.result.filter(
      (item) =>
        FILTER_KEYS.some((keys) => keys === item.category) &&
        SPECIES_CLASSES.some((keys) => keys === item.class_name)
    );

    setSpecies(filteredSpecies);

    return () => setSpecies(null);
  }, []);

  return (
    <div>
      {species &&
        species.map((item) => (
          <Species
            key={item.scientific_name}
            name={item.scientific_name}
            taxonid={item.taxonid}
          />
        ))}
    </div>
  );
};

export default SpeciesList;
