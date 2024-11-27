import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TraitProvider } from "./contexts/TraitContext";
import { Buffer } from "buffer";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TraitProvider>
      <App />
    </TraitProvider>
  </React.StrictMode>
);