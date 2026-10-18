import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "#/router";

const queryClient = new QueryClient();
const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
// oxlint-disable-next-line vitest/require-hook -- app bootstrap, not test setup
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider basepath={import.meta.env.BASE_URL} router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
