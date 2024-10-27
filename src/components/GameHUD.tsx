import React from "react";

export interface GameHUDProps {
  health: number;
  level: number;
  time: number;
}

const formatTime = (time: number): string => {
  return time.toString().padStart(2, "0");
};

const GameHUD: React.FC<GameHUDProps> = ({ health, level, time }) => {
  const cappedHealth = Math.max(0, Math.min(3, health));

  return (
    <div className="relative w-full max-w-2xl mx-auto py-8">
      <div className="absolute top-4 left-6">
        <div className="text-red-700 text-2xl">
          {[...Array(3)].map((_, i) => (
            <span key={i}>{i < cappedHealth ? "♥" : "♡"}</span>
          ))}
        </div>
      </div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="text-yellow-500 text-2xl font-bold">Level {level}</div>
      </div>

      <div className="absolute top-4 right-6">
        <div className="text-yellow-500 text-2xl font-bold">
          00:{formatTime(time)}
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
