import React, { createContext, useContext, useState, useEffect } from "react";

interface SettingsState {
  nickname: string;
  soundOn: boolean;
  language: string;
  background: string;
  country: string;
  userID: string;
  setNickname: (nickname: string) => void;
  setSoundOn: (soundOn: boolean) => void;
  setLanguage: (language: string) => void;
  setBackground: (background: string) => void;
  setCountry: (country: string) => void;
}

const defaultSettings: SettingsState = {
  nickname: "Player",
  soundOn: true,
  language: "Čeština",
  background: "Tmavé",
  country: "Česko",
  userID: "",
  setNickname: () => {},
  setSoundOn: () => {},
  setLanguage: () => {},
  setBackground: () => {},
  setCountry: () => {},
};

const SettingsContext = createContext<SettingsState>(defaultSettings);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nickname, setNickname] = useState(defaultSettings.nickname);
  const [soundOn, setSoundOn] = useState(defaultSettings.soundOn);
  const [language, setLanguage] = useState(defaultSettings.language);
  const [background, setBackground] = useState(defaultSettings.background);
  const [country, setCountry] = useState(defaultSettings.country);

  const userID = localStorage.getItem("userID") || "123";

  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      localStorage.setItem("userID", userID);
    }

    const savedNickname = localStorage.getItem("nickname");
    const savedSoundOn = localStorage.getItem("soundOn");
    const savedLanguage = localStorage.getItem("language");
    const savedBackground = localStorage.getItem("background");
    const savedCountry = localStorage.getItem("country");

    if (savedNickname) setNickname(savedNickname);
    if (savedSoundOn) setSoundOn(JSON.parse(savedSoundOn));
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedBackground) setBackground(savedBackground);
    if (savedCountry) setCountry(savedCountry);
  }, []);

  useEffect(() => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("soundOn", JSON.stringify(soundOn));
    localStorage.setItem("language", language);
    localStorage.setItem("background", background);
    localStorage.setItem("country", country);
  }, [nickname, soundOn, language, background, country]);

  return (
    <SettingsContext.Provider
      value={{
        nickname,
        soundOn,
        language,
        background,
        country,
        userID,
        setNickname,
        setSoundOn,
        setLanguage,
        setBackground,
        setCountry,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
