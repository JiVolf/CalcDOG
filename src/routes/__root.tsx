import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useMatchRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Button from "../components/Button";
import { useGame } from "../components/GameContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matchRoute = useMatchRoute();
  const isRoot = matchRoute({ to: "/" });
  const { startNewGame, continueGame } = useGame();

  const [highestLevel, setHighestLevel] = useState(1);

  useEffect(() => {
    const savedHighestLevel = Number(localStorage.getItem("highestLevel")) || 1;
    setHighestLevel(savedHighestLevel);
  }, []);

  return (
    <>
      {isRoot ? (
        <div className="h-screen flex justify-center items-center  min-w-[360px] bg-gray-300">
          <div className="w-full max-w-xs p-6 bg-white  rounded-lg shadow-lg">
            <div className="flex flex-col gap-4 text-lg text-center justify-center">
              <h1 className="text-2xl font-bold">Count Up</h1>
              <Link
                to="/game"
                className="px-4 py-1 "
                onClick={() => startNewGame()}
              >
                <Button>Nová Hra</Button>
              </Link>
              <Link
                to="/game"
                onClick={() => continueGame(highestLevel, 3, 30)}
                className="px-4 py-1 "
              >
                <Button>Pokračovat</Button>
              </Link>
              <Link to="/highscores" className="px-4 py-1 ">
                <Button>Žebříček</Button>
              </Link>
              <Link to="/clan" className="px-4 py-1 ">
                <Button>Klan</Button>
              </Link>
              <Link to="/settings" className="px-4 py-1 ">
                <Button>Nastavení</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center  min-w-[360px] bg-gray-300">
          <div className="w-full max-w-xs p-6 bg-white  rounded-lg shadow-lg">
            <Outlet />
          </div>
        </div>
      )}
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
