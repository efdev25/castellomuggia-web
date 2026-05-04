import it from './it.json';
import fr from './fr.json';
import de from './de.json';

// L'italiano è la lingua principale (fonte di verità per i tipi)
export const languages = {
  it: 'Italiano',
  fr: 'Français',
  de: 'Deutsch',
};

export const defaultLang = 'it';

export type Language = keyof typeof languages;
export type TranslationKey = keyof typeof it;

// Creiamo un dizionario type-safe senza usare cast con "as any".
// Le altre lingue possono essere parziali, l'italiano è obbligatoriamente completo.
const translations: Record<Language, Partial<Record<TranslationKey, string>>> = {
  it,
  fr,
  de,
};

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in translations) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: TranslationKey): string {
    // Ritorna la traduzione richiesta, oppure il fallback italiano.
    return translations[lang]?.[key] ?? translations[defaultLang][key] ?? key;
  };
}
