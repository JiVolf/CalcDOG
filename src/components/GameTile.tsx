import React from "react";

interface GameTileProps {
  tileValue: number | null;
  isSelected: boolean;
  onClick: () => void;
  variant?: "grid" | "buffer";
}

const GameTile: React.FC<GameTileProps> = ({
  tileValue,
  isSelected,
  onClick,
  variant = "grid",
}) => {
  const tileClass = `flex items-center justify-center border-2 rounded-md cursor-pointer ${
    isSelected ? "bg-gray-400" : "bg-gray-100"
  } ${variant === "grid" ? "w-16 h-16" : "w-12 h-12"}`;

  return (
    <div onClick={onClick} className={tileClass}>
      {tileValue}
    </div>
  );
};

export default GameTile;
