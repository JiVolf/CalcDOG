import React, { createContext, useContext, useState } from "react";

interface GameState {
  level: number;
  health: number;
  time: number;
  startNewGame: () => void;
  continueGame: (level: number, health: number, time: number) => void;
}

const defaultState: GameState = {
  level: 1,
  health: 3,
  time: 30,
  startNewGame: () => {},
  continueGame: () => {},
};

const GameContext = createContext<GameState>(defaultState);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [level, setLevel] = useState(1);
  const [health, setHealth] = useState(3);
  const [time, setTime] = useState(30);

  const startNewGame = () => {
    setLevel(1);
    setHealth(3);
    setTime(30);
  };

  const continueGame = (
    savedLevel: number,
    savedHealth: number,
    savedTime: number
  ) => {
    setLevel(savedLevel);
    setHealth(savedHealth);
    setTime(savedTime);
  };

  return (
    <GameContext.Provider
      value={{ level, health, time, startNewGame, continueGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
