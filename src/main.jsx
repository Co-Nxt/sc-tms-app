import { createRoot } from "react-dom/client";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ThemeProvider from "./ThemeContext.jsx";
import App from "./App";
const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
);
