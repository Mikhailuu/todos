import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src/components/app";
import { onCaughtErrorProd, onRecoverableErrorProd, onUncaughtErrorProd } from "./reportError";

const container = document.getElementById("root");
const root = createRoot(container, {
  onCaughtError: onCaughtErrorProd,
  onRecoverableError: onRecoverableErrorProd,
  onUncaughtError: onUncaughtErrorProd,
});
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
