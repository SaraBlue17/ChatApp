import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

createRoot(document.getElementById("root")).render(
  <SWRConfig value={{ fetcher }}>
    <App />
  </SWRConfig>
);
