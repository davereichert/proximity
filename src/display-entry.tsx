import React from "react";
import { createRoot } from "react-dom/client";
import { DisplayPanel } from "./DisplayPanel";
import "./index.css";

const container = document.getElementById("root")!;
createRoot(container).render(
  <React.StrictMode>
    <DisplayPanel />
  </React.StrictMode>
);
