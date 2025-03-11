import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./scorm-mock";
import "./styles/normalize.css";
import "./styles/skeleton.css";
import "./styles/styles.css";

const container = document.getElementById("app");
if (!container) {
  throw new Error("Elemento #app não encontrado no DOM");
}

const root = createRoot(container);
root.render(<App />);
