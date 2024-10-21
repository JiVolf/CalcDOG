import * as React from "react";

const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
      {children}
    </button>
  );
};

export default Button;
