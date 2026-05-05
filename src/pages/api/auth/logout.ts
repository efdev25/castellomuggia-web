import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, redirect, request }) => {
  // Eliminiamo i cookie di sessione per effettuare il logout
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  
  // Ritorno alla home page (o al login) preservando possibilmente la lingua
  const referer = request.headers.get("referer");
  if (referer && referer.includes("/fr/")) return redirect("/fr/login");
  if (referer && referer.includes("/de/")) return redirect("/de/login");
  
  return redirect("/it/login");
};
