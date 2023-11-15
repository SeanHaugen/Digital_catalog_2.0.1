import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "../src/stateMgmt/Store";
import App from "./App";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
