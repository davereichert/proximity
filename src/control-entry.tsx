import React from "react";
import { createRoot } from "react-dom/client";
import { ControlPanel } from "./ControlPanel";
import "./index.css";

const container = document.getElementById("root")!;
createRoot(container).render(
  <React.StrictMode>
    <ControlPanel />
  </React.StrictMode>
);
