import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter basename="/Fishing-App-2">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
