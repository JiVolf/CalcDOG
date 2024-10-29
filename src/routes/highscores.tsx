import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";

interface HighscoreEntry {
  userID: string;
  nickname: string;
  highestLevel: number;
  country: string;
}

const HighscoresPage: React.FC = () => {
  const [highscores, setHighscores] = useState<HighscoreEntry[]>([]);
  const navigate = useNavigate();

  const handleMenu = () => {
    navigate({ to: "/" });
  };

  useEffect(() => {
    const loadedScores: HighscoreEntry[] = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("highscore_")) {
        const score = JSON.parse(localStorage.getItem(key) || "{}");
        loadedScores.push(score);
      }
    });

    loadedScores.sort((a, b) => b.highestLevel - a.highestLevel);
    setHighscores(loadedScores);
  }, []);

  return (
    <div className="highscores-container mx-auto max-w-lg p-6  shadow-lg rounded-lg ">
      <h2 className="text-3xl font-bold text-center mb-6 border-b-2  pb-2">
        Highscores
      </h2>
      <ul className="highscores-list space-y-4">
        {highscores.map((score) => (
          <li
            key={score.userID}
            className="highscore-entry flex justify-between items-center p-4  rounded-lg shadow hover:shadow-md transition-all duration-200 ease-in-out"
          >
            <div>
              <p className="text-lg font-semibold">{score.nickname}</p>
              <p className="text-sm ">{score.country}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold ">Level {score.highestLevel}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center py-6">
        <Button onClick={handleMenu}>Menu</Button>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/highscores")({
  component: HighscoresPage,
});
