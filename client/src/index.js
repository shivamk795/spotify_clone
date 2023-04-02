import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { StateProvider } from "./Context/StateProvider";
import reducer, { initialState } from "./Context/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
