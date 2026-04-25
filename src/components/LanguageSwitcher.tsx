import { useLang } from "@/i18n/LanguageContext";
import { LANGS, Lang } from "@/i18n/translations";
import { cn } from "@/lib/utils";

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { lang, setLang } = useLang();

  return (
    <div className={cn("flex items-center gap-1", className)} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code as Lang)}
          aria-label={l.label}
          aria-pressed={lang === l.code}
          title={l.label}
          className={cn(
            "h-8 w-8 rounded-full text-base flex items-center justify-center transition-all",
            lang === l.code
              ? "ring-1 ring-gold/70 bg-gold/10"
              : "opacity-60 hover:opacity-100 hover:bg-foreground/5"
          )}
        >
          <span aria-hidden>{l.flag}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
