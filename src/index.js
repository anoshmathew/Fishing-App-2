import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <HashRouter hashType="hashbang" basename="">
    <App />
  </HashRouter>,
  document.getElementById("root")
);
