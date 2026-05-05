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

  // 3. /account/* → verifica sessione Supabase Auth per i clienti
  if (url.pathname.includes('/account')) {
    const accessToken = context.cookies.get('sb-access-token')?.value;
    const refreshToken = context.cookies.get('sb-refresh-token')?.value;

    const [, lang] = url.pathname.split('/'); 
    const loginUrl = `/${lang || 'it'}/login`;

    if (!accessToken || !refreshToken) {
      return redirect(loginUrl, 302);
    }

    // In un'architettura vera andrebbe verificata la firma del JWT o chiamato supabase.auth.getUser()
    // Per ora controlliamo l'esistenza, la VERA sicurezza la fa RLS su Supabase al momento della query
  }

  // 4. Tutte le altre rotte (/*) → accesso pubblico consentito
  return next();
});
