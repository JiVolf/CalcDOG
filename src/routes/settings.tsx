import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useState } from "react";
import Dropdown from "../components/DropdownMenu";

function SettingsApp() {
  // Language selection
  const [selectLanguage, setSelectLanguage] = React.useState(() => {
    return localStorage.getItem("selectLanguage") || "Čeština";
  });

  React.useEffect(() => {
    localStorage.setItem("selectLanguage", selectLanguage);
  }, [selectLanguage]);

  const handleSelectLanguage = (option: string) => {
    setSelectLanguage(option);
  };

  // Background selection
  const [selectBackground, setSelectBackground] = React.useState(() => {
    return localStorage.getItem("selectBackground") || "Tmavé";
  });

  React.useEffect(() => {
    localStorage.setItem("selectBackground", selectBackground);
  }, [selectBackground]);

  const handleSelectBackground = (option: string) => {
    setSelectBackground(option);
  };

  // Username field

  const [username, setUsername] = React.useState(() => {
    return localStorage.getItem("username") || "";
  });
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  // Sound toggle

  const [soundOn, setSoundOn] = useState(true);

  const handleSoundToggle = () => {
    const newSoundOn = !soundOn;
    setSoundOn(newSoundOn);
    if (newSoundOn) {
      /* playSound("select"); */
    }
  };

  // Country selection

  const [selectCountry, setSelectCountry] = React.useState(() => {
    return localStorage.getItem("selectCountry") || "Česko";
  });

  React.useEffect(() => {
    localStorage.setItem("selectCountry", selectCountry);
  }, [selectCountry]);

  const handleSelectCountry = (option: string) => {
    setSelectCountry(option);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Nastavení</h1>
      <div className="flex items-center justify-between w-full">
        <span className="mr-4">Username:</span>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Anonymous"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <span>Zvuk</span>
        <button onClick={handleSoundToggle} className="p-2">
          {soundOn ? (
            <svg className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            </svg>
          ) : (
            <svg className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3l18 18"
                />
              </svg>
            </svg>
          )}
        </button>
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="">Language:</span>
        <Dropdown
          options={["Čeština", "English"]}
          selected={selectLanguage}
          onSelect={handleSelectLanguage}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="">Background:</span>
        <Dropdown
          options={["Tmavé", "Modré", "Červené"]}
          selected={selectBackground}
          onSelect={handleSelectBackground}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="">Country:</span>
        <Dropdown
          options={["Česko", "United States", "Deutschland"]}
          selected={selectCountry}
          onSelect={handleSelectCountry}
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/settings")({
  component: SettingsApp,
});
