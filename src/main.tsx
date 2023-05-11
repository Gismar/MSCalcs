import React from "react";
import ReactDOM from "react-dom/client";
import App, { ExpSources } from "./App.tsx";
import "./index.css";
import tempData from "../data/multiplicative-exp-buff-data.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App
      data={tempData as ExpSources[]}
      header="Multiplicative Stacking Exp Bonuses"
      isAdditive={false}
    />
  </React.StrictMode>
);