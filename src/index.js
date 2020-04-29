import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";
import SpeciesList from "./components/SpeciesList";

import "./assets/styles/global.scss";

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="main">
        <SpeciesList />
      </main>
    </Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
