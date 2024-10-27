import React from "react";

interface GameTileProps {
  tileValue: number | null;
  isSelected: boolean;
  onClick: () => void;
}

const GameTile: React.FC<GameTileProps> = ({
  tileValue,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 flex items-center justify-center border-2 rounded-md cursor-pointer ${
        isSelected ? "bg-green-400" : "bg-gray-200"
      }`}
    >
      {tileValue}
    </div>
  );
};

export default GameTile;
