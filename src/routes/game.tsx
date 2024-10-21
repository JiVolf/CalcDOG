import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";

const Game = () => {
  const [level, setLevel] = useState(1);
  const [hp, setHp] = useState(3);
  const [time, setTime] = useState(30 + level);
  const [grid, setGrid] = useState<number[][]>([]);
  const [selectedTiles, setSelectedTiles] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [sum, setSum] = useState(0);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        else {
          loseHP();
          return 30 + level; // Reset timer
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [level]);

  // Function to lose HP
  const loseHP = () => {
    if (hp > 1) {
      setHp(hp - 1);
      generateGrid(); // Reset grid when HP is lost
    } else {
      alert("Game Over");
      resetGame();
    }
  };

  // Generate a solvable grid where 4 random tiles sum to the player's level
  const generateGrid = () => {
    const newGrid = Array(4)
      .fill(0)
      .map(() =>
        Array(4)
          .fill(0)
          .map(() => Math.floor(Math.random() * (level + 1)))
      );
    setGrid(newGrid);
    // Ensure the grid is solvable
    solutionCheck(newGrid);
  };

  // Check if 4 tiles can sum to player level
  const solutionCheck = (grid: number[][]) => {
    let flatten = grid.flat();
    let foundSolution = false;
    for (let i = 0; i < flatten.length; i++) {
      for (let j = i + 1; j < flatten.length; j++) {
        for (let k = j + 1; k < flatten.length; k++) {
          for (let l = k + 1; l < flatten.length; l++) {
            if (flatten[i] + flatten[j] + flatten[k] + flatten[l] === level) {
              foundSolution = true;
            }
          }
        }
      }
    }
    if (!foundSolution) generateGrid(); // Re-generate if no solution exists
  };

  // Select/deselect tiles
  const handleTileSelect = (rowIndex: number, colIndex: number) => {
    const tileValue = grid[rowIndex][colIndex];
    const tileID = rowIndex * 4 + colIndex;
    const alreadySelectedIndex = selectedTiles.findIndex(
      (tile) => tile === tileID
    );

    if (alreadySelectedIndex === -1) {
      // Select tile
      const newSelectedTiles = [...selectedTiles];
      const firstEmptyIndex = newSelectedTiles.findIndex(
        (tile) => tile === null
      );
      if (firstEmptyIndex !== -1) {
        newSelectedTiles[firstEmptyIndex] = tileID;
        setSelectedTiles(newSelectedTiles);
        setSum(sum + tileValue);
      }
    } else {
      // Deselect tile
      const newSelectedTiles = [...selectedTiles];
      newSelectedTiles[alreadySelectedIndex] = null;
      setSelectedTiles(newSelectedTiles);
      setSum(sum - tileValue);
    }
  };

  // Check if sum matches the player's level
  const handleSumCheck = () => {
    if (sum === level) {
      setLevel(level + 1);
      generateGrid();
      setSelectedTiles([null, null, null, null]);
      setSum(0);
    }
  };

  // Reset game
  const resetGame = () => {
    setLevel(1);
    setHp(3);
    setTime(30 + level);
    setSelectedTiles([null, null, null, null]);
    generateGrid();
  };

  useEffect(() => {
    generateGrid(); // Generate grid on mount
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-gray-100 p-4">
      {/* HUD */}
      <div className="flex justify-between w-full max-w-md mb-4">
        <div className="text-xl">Level: {level}</div>
        <div className="text-xl">Time: {time}</div>
        <div className="text-xl">HP: {"❤️".repeat(hp)}</div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => {
            const tileID = rowIndex * 4 + colIndex;
            const isSelected = selectedTiles.includes(tileID);
            return (
              <div
                key={tileID}
                className={`w-16 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer ${
                  isSelected ? "bg-gray-300" : "bg-blue-400"
                }`}
                onClick={() => handleTileSelect(rowIndex, colIndex)}
              >
                {tile}
              </div>
            );
          })
        )}
      </div>

      {/* Player Tile Selection */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {selectedTiles.map((tileID, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="flex items-center justify-center">+</div>
            )}
            <div className="w-16 h-16 flex items-center justify-center text-2xl font-bold bg-gray-200">
              {tileID !== null ? grid[Math.floor(tileID / 4)][tileID % 4] : ""}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Sum Tile */}
      <div
        className={`w-64 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer ${
          sum === level ? "bg-green-400" : "bg-red-400"
        }`}
        onClick={handleSumCheck}
      >
        Sum: {sum}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/game")({
  component: Game,
});
