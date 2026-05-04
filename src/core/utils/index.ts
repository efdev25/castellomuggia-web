/**
 * Funzioni pure prive di side-effects e senza dipendenze da framework.
 * Testabili al 100%.
 */

/**
 * Formatta un numero come valuta rispettando la lingua dell'utente.
 */
export function formatCurrency(amount: number, lang: string = 'it', currency: string = 'EUR'): string {
  // Converte la sigla lingua nel formato locale completo (es. it-IT)
  const locale = lang === 'it' ? 'it-IT' : lang === 'fr' ? 'fr-FR' : 'de-DE';
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

/**
 * Valida un indirizzo email usando una regex standard senza librerie esterne.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
