import React, { lazy, useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom";

import "./assets/styles/global.scss";

import { fetchData } from "./utils";

const Header = lazy(() => import("./components/Header"));
const SpeciesList = lazy(() => import("./components/SpeciesList"));

const App = () => {
  const [randomRegion, setRandomRegion] = useState(null);
  const [regions, setRegions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRegions = async () => {
    const response = await fetchData(`/region/list`);

    setRegions(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!regions) {
      fetchRegions();
    }
  }, [regions]);

  useEffect(() => {
    if (regions && regions.results) {
      setRandomRegion(
        regions.results[Math.floor(Math.random() * regions.results.length)]
      );
    }
  }, [regions]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Header />
      <main className="main">
        {isLoading ? <p>Loading...</p> : <SpeciesList region={randomRegion} />}
      </main>
    </Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
