import { createContext, useContext, useEffect, useState } from "react";

export const LANGS = ["en", "es", "ca"];
const DEFAULT = "en";
const STORAGE_KEY = "xb_redesign_lang";

const LangContext = createContext({ lang: DEFAULT, setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (saved && LANGS.includes(saved)) setLang(saved);
  }, []);

  const updateLang = (l) => {
    if (!LANGS.includes(l)) return;
    setLang(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang: updateLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** value is a string (returned as-is) or { en, es, ca }. */
export function t(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.es || value.ca || "";
}
