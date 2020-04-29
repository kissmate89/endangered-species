import { BASE_URL } from "./constants";

export const concatanateResult = (result, property) =>
  result.reduce(
    (acc, curr, idx) =>
      acc + `${curr[property]}${idx + 1 < result.length ? ", " : ""}`,
    ""
  );

export const fetchData = async (url) => {
  try {
    const response = await fetch(
      `${BASE_URL}${url}?token=${process.env.REACT_APP_IUCN_TOKEN}`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
