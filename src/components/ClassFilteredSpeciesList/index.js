import React, { useState, useEffect } from "react";

import { concatanateResult } from "../../utils";

const SPECIES_CLASSES = ["MAMMALIA"];

const ClassFilteredSpeciesList = ({ species }) => {
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    if (species) {
      setSpeciesList(
        species.filter((item) =>
          SPECIES_CLASSES.some((keys) => keys === item.class_name)
        )
      );
    }
  }, [species]);

  return (
    speciesList.length > 0 && (
      <div>
        <h2>Species of {SPECIES_CLASSES}</h2>
        <p>{concatanateResult(speciesList, "scientific_name")}</p>
      </div>
    )
  );
};

export default ClassFilteredSpeciesList;
