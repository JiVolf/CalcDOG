import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import GameHUD from "../components/gameHUD";
import GameTile from "../components/GameTile";
import GameMenuBar from "../components/GameMenuBar";
import { useGame } from "../components/GameContext";

const Game: React.FC = () => {
  const gridSize = 4;
  const { level, health, time, setLevel, setHealth, setTime } = useGame();

  const generateRandomTileValue = () => Math.floor(Math.random() * (level + 1));

  const initializeGrid = () => {
    const newGrid = Array(gridSize * gridSize)
      .fill(0)
      .map(() => ({
        tileValue: generateRandomTileValue(),
        isSelected: false,
      }));
    return newGrid;
  };

  const [grid, setGrid] = useState(() => {
    const savedGrid = localStorage.getItem("grid");
    return savedGrid ? JSON.parse(savedGrid) : initializeGrid();
  });

  const [selectedTiles, setSelectedTiles] = useState<
    (null | { tileValue: number; gridIndex: number })[]
  >(() => {
    const savedTiles = localStorage.getItem("selectedTiles");
    return savedTiles ? JSON.parse(savedTiles) : Array(4).fill(null);
  });

  useEffect(() => {
    localStorage.setItem("selectedTiles", JSON.stringify(selectedTiles));
  }, [selectedTiles]);

  useEffect(() => {
    localStorage.setItem("grid", JSON.stringify(grid));
  }, [grid]);

  useEffect(() => {
    generateGrid();
  }, []);

  const handleTileClick = (index: number) => {
    const newGrid = [...grid];
    const clickedTile = newGrid[index];

    if (clickedTile.isSelected) {
      handleDeselectTile(
        selectedTiles.findIndex((tile) => tile?.gridIndex === index)
      );
    } else {
      const firstNullIndex = selectedTiles.findIndex((tile) => tile === null);
      if (firstNullIndex !== -1) {
        const newSelectedTiles = [...selectedTiles];
        newSelectedTiles[firstNullIndex] = {
          tileValue: clickedTile.tileValue,
          gridIndex: index,
        };
        setSelectedTiles(newSelectedTiles);
        clickedTile.isSelected = true;
      }
    }

    setGrid(newGrid);
    localStorage.setItem("grid", JSON.stringify(newGrid));
  };

  const handleDeselectTile = (bufferIndex: number) => {
    const tileInfo = selectedTiles[bufferIndex];
    if (tileInfo) {
      const newGrid = [...grid];
      newGrid[tileInfo.gridIndex].isSelected = false;
      setGrid(newGrid);

      const newSelectedTiles = [...selectedTiles];
      newSelectedTiles[bufferIndex] = null;
      setSelectedTiles(newSelectedTiles);

      localStorage.setItem("grid", JSON.stringify(newGrid));
      localStorage.setItem("selectedTiles", JSON.stringify(newSelectedTiles));
    }
  };

  const calculateLevelTime = (level: number) => {
    const baseTime = 30;
    const additionalTime = Math.floor(level / 10) * 5;
    return Math.min(baseTime + additionalTime, 99);
  };

  useEffect(() => {
    setTime(calculateLevelTime(level));
  }, [level]);

  const generateGrid = () => {
    const newGrid = initializeGrid();
    setGrid(newGrid);
    setSelectedTiles(Array(4).fill(null));
    setTime(calculateLevelTime(level));
    localStorage.setItem("grid", JSON.stringify(newGrid));
    localStorage.setItem("selectedTiles", JSON.stringify(Array(4).fill(null)));
  };

  const sumOfSelectedTiles = selectedTiles.reduce((sum, tile) => {
    return tile ? sum + tile.tileValue : sum;
  }, 0);

  const isSelectionComplete = selectedTiles.every((tile) => tile !== null);
  const isSumCorrect = sumOfSelectedTiles === level;
  const buttonStyles = isSelectionComplete
    ? isSumCorrect
      ? "bg-green-500 text-white"
      : "bg-red-500 text-white"
    : "bg-gray-300 text-gray-700 cursor-not-allowed";

  const handleSumButtonClick = () => {
    if (!isSelectionComplete) return;

    if (isSumCorrect) {
      setLevel((prevLevel) => prevLevel + 1);
      generateGrid();
    } else {
      setHealth((prevHealth) => Math.max(prevHealth - 1, 0));
      generateGrid();
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          setHealth((prevHealth) => Math.max(prevHealth - 1, 0));
          return time;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="justify-center items-center">
      <div className="">
        <GameMenuBar onPause={generateGrid} />
      </div>
      <div className="">
        <GameHUD health={health} level={level} time={time} />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {grid.map(
          (tile: { tileValue: number; isSelected: boolean }, index: number) => (
            <GameTile
              key={index}
              tileValue={tile.tileValue}
              isSelected={tile.isSelected}
              onClick={() => handleTileClick(index)}
            />
          )
        )}
      </div>

      <button
        onClick={generateGrid}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Grid
      </button>
      <div className="flex items-center justify-center mt-4">
        {selectedTiles.map((tile, index) => (
          <React.Fragment key={index}>
            <GameTile
              tileValue={tile?.tileValue ?? null}
              isSelected={tile !== null}
              onClick={() => handleDeselectTile(index)}
            />
            {index < selectedTiles.length - 1 && (
              <span className="mx-2 text-lg font-bold">+</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleSumButtonClick}
          className={`px-4 py-2 rounded font-bold ${buttonStyles}`}
          disabled={!isSelectionComplete}
        >
          Sum: {sumOfSelectedTiles}
        </button>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/game")({
  component: Game,
});
