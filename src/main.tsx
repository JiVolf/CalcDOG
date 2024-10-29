import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { GameProvider } from "./components/GameContext";
import { SettingsProvider } from "./components/SettingsContext";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <SettingsProvider>
      <GameProvider>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </GameProvider>
    </SettingsProvider>
  );
}
