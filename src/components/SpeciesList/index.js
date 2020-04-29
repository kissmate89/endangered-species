import React, { useEffect, useState } from "react";

import { BASE_URL } from "../../constants";
import { useFetch } from "../../utils/hooks";

import Species from "../Species";

const FILTER_KEYS = ["CR"];
const SPECIES_CLASSES = ["MAMMALIA"];

const SpeciesList = () => {
  const [species, setSpecies] = useState(null);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [regionData] = useFetch(`${BASE_URL}/region/list`);

  useEffect(() => {
    if (!species && regionData.results) {
      setIsLoading(true);

      const randomRegion =
        regionData.results[
          Math.floor(Math.random() * regionData.results.length)
        ];

      const fetchSpecies = async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/species/region/${randomRegion.identifier}/page/0?token=${process.env.IUCN_TOKEN}`
          );
          const data = await response.json();
          const filteredSpecies = data.result.filter((item) =>
            FILTER_KEYS.some((keys) => keys === item.category)
          );

          setFilteredClasses(
            filteredSpecies.filter((item) =>
              SPECIES_CLASSES.some((keys) => keys === item.class_name)
            )
          );

          setSpecies(filteredSpecies);
        } catch (err) {
          console.error(err);
        }
        setIsLoading(false);
      };
      fetchSpecies();
    }
  }, [regionData, species]);

  if (isLoading) {
    return <p>Data is loading...</p>;
  }

  if (!isLoading && species && species.length === 0) {
    return <h3>There are no species found</h3>;
  }

  return (
    <>
      {filteredClasses.length > 0 && (
        <div>
          <h2>Species of {SPECIES_CLASSES}</h2>
          {filteredClasses.map((item) => (
            <p key={item.scientific_name}>{item.scientific_name}</p>
          ))}
        </div>
      )}

      {species && (
        <div>
          <h2>Critically Endangered Species</h2>
          {species.map((item) => (
            <Species key={item.scientific_name} name={item.scientific_name} />
          ))}
        </div>
      )}
    </>
  );
};

export default SpeciesList;
