import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Link } from "@tanstack/react-router";
import Button from "../components/Button";

export const Route = createFileRoute("/mainmenu")({
  component: MainMenu,
});

function MainMenu() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 text-lg text-center">
          <Link
            to="/game"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            <Button>Go to Game</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
