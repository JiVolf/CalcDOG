import React from "react";
import { useNavigate } from "@tanstack/react-router";

interface GameOverlayProps {
  onClick: () => void;
  message: string;
  isGameOver: boolean;
}

const GameOverlay: React.FC<GameOverlayProps> = ({
  onClick,
  message,
  isGameOver,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isGameOver) {
      navigate({ to: "/" });
    } else {
      onClick();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-100 flex flex-col items-center justify-center space-y-4"
      onClick={handleClick}
    >
      <div className=" text-4xl">{message}</div>
    </div>
  );
};

export default GameOverlay;
