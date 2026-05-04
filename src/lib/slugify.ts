// Generate URL-friendly slugs from arbitrary text.
// Handles Scandinavian and common European characters.
const charMap: Record<string, string> = {
  å: "a", ä: "a", á: "a", à: "a", â: "a", ã: "a",
  ö: "o", ø: "o", ó: "o", ò: "o", ô: "o", õ: "o",
  ü: "u", ú: "u", ù: "u", û: "u",
  é: "e", è: "e", ê: "e", ë: "e",
  í: "i", ì: "i", î: "i", ï: "i",
  ñ: "n", ç: "c", ý: "y", ÿ: "y",
  æ: "ae", œ: "oe", ß: "ss",
};

export function slugify(input: string | null | undefined): string {
  if (!input) return "";
  let s = input.toLowerCase().trim();
  s = s.replace(/[åäáàâãöøóòôõüúùûéèêëíìîïñçýÿæœß]/g, (c) => charMap[c] ?? c);
  // Strip any other diacritics
  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  s = s.replace(/&/g, " and ");
  s = s.replace(/[^a-z0-9]+/g, "-");
  s = s.replace(/^-+|-+$/g, "");
  return s;
}
