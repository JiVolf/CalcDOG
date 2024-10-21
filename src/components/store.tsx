import { create } from "zustand";

// Zustand store for managing selected language
const useLanguageStore = create((set) => ({
  selectLanguage: "Čeština",
  setSelectLanguage: (option: string) => set({ selectLanguage: option }),
}));

type Language = {
  selectLanguage: string;
  setSelectLanguage: (option: string) => void;
};

export default useLanguageStore;
