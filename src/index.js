import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Modals from "./components/Modals";
import { GlobalContextProvider } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Modals />
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
