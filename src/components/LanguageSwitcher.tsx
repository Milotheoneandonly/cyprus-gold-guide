import { useLang } from "@/i18n/LanguageContext";
import { LANGS, Lang } from "@/i18n/translations";
import { cn } from "@/lib/utils";

// Short label shown in the switcher button (region code, not language code).
const SHORT_LABEL: Record<Lang, string> = {
  sv: "SE",
  no: "NO",
  da: "DK",
  en: "EN",
};

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { lang, setLang } = useLang();

  return (
    <div className={cn("flex items-center gap-1", className)} role="group" aria-label="Language">
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code as Lang)}
            aria-label={l.label}
            aria-pressed={active}
            data-lang={l.code}
            title={l.label}
            className={cn(
              "h-8 min-w-[36px] px-2 rounded-full text-[11px] font-medium tracking-wider flex items-center justify-center transition-all border",
              active
                ? "border-gold/70 bg-gold/10 text-gold"
                : "border-transparent opacity-60 hover:opacity-100 hover:bg-foreground/5 text-foreground/80",
            )}
          >
            {SHORT_LABEL[l.code as Lang]}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
