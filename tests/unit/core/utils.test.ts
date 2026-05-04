import { describe, it, expect } from 'vitest';
import { formatCurrency, isValidEmail } from '@core/utils/index';

describe('Core Utils - formatCurrency', () => {
  it('dovrebbe formattare correttamente gli Euro in italiano', () => {
    const formatted = formatCurrency(10.5, 'it', 'EUR');
    // A seconda dell'ambiente Node, lo spazio potrebbe essere un non-breaking space
    expect(formatted.replace(/\s/g, ' ')).toContain('10,50');
    expect(formatted).toContain('€');
  });

  it('dovrebbe formattare correttamente gli Euro in francese', () => {
    const formatted = formatCurrency(10.5, 'fr', 'EUR');
    expect(formatted).toContain('10,50');
  });
});

describe('Core Utils - isValidEmail', () => {
  it('dovrebbe restituire true per email valide', () => {
    expect(isValidEmail('test@castellomuggia.eu')).toBe(true);
    expect(isValidEmail('admin.123@domain.co.uk')).toBe(true);
  });

  it('dovrebbe restituire false per email non valide', () => {
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('test@domain')).toBe(false);
    expect(isValidEmail('test.domain.com')).toBe(false);
  });
});
