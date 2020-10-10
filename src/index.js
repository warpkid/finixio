import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const apiKey =
  "f1a217d4951c8a4e779cddd96e6e0a112610327b8d8f4c284ff1d7cf36ee69a6";

ReactDOM.render(
  <React.StrictMode>
    <App apiKey={apiKey} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
