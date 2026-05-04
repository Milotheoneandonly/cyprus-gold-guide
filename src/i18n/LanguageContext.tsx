import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Lang, translations } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations[Lang];
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "cy-lang";
const VALID: readonly Lang[] = ["sv", "no", "da", "en"];

const isValidLang = (v: unknown): v is Lang =>
  typeof v === "string" && (VALID as readonly string[]).includes(v);

const readStoredLang = (): Lang => {
  if (typeof window === "undefined") return "sv";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isValidLang(saved)) return saved;
    // Stale/invalid — clear it so we don't read it again.
    if (saved !== null) window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  return "sv";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    if (!isValidLang(l)) return;
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
