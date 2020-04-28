import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";

import "./assets/styles/global.scss";

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="main"></main>
    </Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
