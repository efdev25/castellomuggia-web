/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node', // Usiamo node per utils e adapters, jsdom per UI (se serve in futuro)
    include: ['tests/**/*.test.ts'],
    globals: true,
  },
});
