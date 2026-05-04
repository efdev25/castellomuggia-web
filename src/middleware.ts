import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, redirect } = context;

  // 1. Root (/) → redirect 302 a /{lingua}/ via Accept-Language
  if (url.pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    let lang = 'it'; // lingua default
    
    if (acceptLanguage) {
      if (acceptLanguage.includes('fr')) lang = 'fr';
      else if (acceptLanguage.includes('de')) lang = 'de';
      // fallback automatico a 'it' per le altre lingue
    }
    
    return redirect(`/${lang}/`, 302);
  }

  // 2. /admin/* → verifica JWT Cloudflare Zero Trust (stub per implementazione futura)
  if (url.pathname.startsWith('/admin')) {
    const jwt = request.headers.get('cf-access-jwt-assertion');
    // In futuro qui verrà chiamato un adapter Cloudflare per validare il JWT
    if (!jwt && import.meta.env.PROD) {
      // return new Response('Unauthorized (Zero Trust)', { status: 401 });
    }
  }

  // 3. /account/* → verifica sessione Supabase Auth per i clienti (stub)
  if (url.pathname.startsWith('/account')) {
    // In futuro qui verrà chiamato Supabase Auth
  }

  // 4. Tutte le altre rotte (/*) → accesso pubblico consentito
  return next();
});
