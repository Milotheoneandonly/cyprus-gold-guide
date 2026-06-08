import { createContext, useContext, useEffect, ReactNode } from "react";
import { Lang, translations } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations[Lang];
};

const LanguageContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: "en", setLang: () => {}, t: translations.en }}>
      {children}
    </LanguageContext.Provider>
  );
};

const defaultCtx: Ctx = { lang: "en", setLang: () => {}, t: translations.en };

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  return ctx ?? defaultCtx;
};
