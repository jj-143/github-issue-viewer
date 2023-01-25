import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { USE_MOCK_SERVER } from "@lib/config/constants";

async function prepare() {
  if (USE_MOCK_SERVER) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
