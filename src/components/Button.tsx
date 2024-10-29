import * as React from "react";

const Button: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
