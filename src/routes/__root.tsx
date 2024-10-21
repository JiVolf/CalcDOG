import * as React from "react";
import {
  Link,
  Outlet,
  useMatchRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Button from "../components/Button";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matchRoute = useMatchRoute();
  const isRoot = matchRoute({ to: "/" });

  return (
    <>
      {isRoot ? (
        <div className="h-screen flex justify-center items-center bg-gray-100 min-w-[360px]">
          <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col gap-4 text-lg text-center">
              <Link
                to="/game"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                <Button>New Game</Button>
              </Link>
              <Link
                to="/highscores"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                <Button>High Scores</Button>
              </Link>
              <Link
                to="/clan"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                <Button>Clan</Button>
              </Link>
              <Link
                to="/settings"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                <Button>Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center bg-gray-100 min-w-[360px]">
          <div className="w-auto p-6 bg-white rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      )}

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
