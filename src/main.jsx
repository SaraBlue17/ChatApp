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
// Per abilitare l'uso di SWR dobbiamo inserire il componente "padre"(App) all'interno di SWRConfig
// A SWRConfig passiamo fetcher, ovvero una funzione che verrà usata automaticamente da useSWR ogni volta che si fa una richiesta
