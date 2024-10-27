import React from "react";

interface GameOverlayProps {
  onClick: () => void;
  message: string;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ onClick, message }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-100 flex items-center justify-center"
      onClick={onClick}
    >
      <div className="text-white text-4xl">{message}</div>
    </div>
  );
};

export default GameOverlay;
