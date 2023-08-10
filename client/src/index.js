import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// render();

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(<App />);
