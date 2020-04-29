import React from "react";

import { BASE_URL } from "../../constants";
import { useFetch } from "../../utils/hooks";

const concatanateResult = (result) =>
  result.reduce(
    (acc, curr, idx) =>
      acc + `${curr.title}${idx + 1 < result.length ? ", " : ""}`,
    ""
  );

const Species = ({ name, taxonid }) => {
  const [data, isLoading, error] = useFetch(
    `${BASE_URL}/measures/species/id/${taxonid}?token=${process.env.IUCN_TOKEN}`
  );

  return (
    <div>
      <h3>{name}</h3>
      {isLoading ? (
        <p>isLoading...</p>
      ) : (
        <p>{data && concatanateResult(data.result)}</p>
      )}
      {!isLoading && error && <p>error</p>}
    </div>
  );
};

export default Species;
