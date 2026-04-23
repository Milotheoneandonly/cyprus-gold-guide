interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeader = ({ eyebrow, title, subtitle, align = "center" }: Props) => (
  <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow && (
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="gold-divider" />
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
        <span className="gold-divider" />
      </div>
    )}
    <h2 className="mt-5 font-serif text-4xl md:text-5xl font-light leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
