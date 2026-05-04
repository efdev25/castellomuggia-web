import { createClient } from '@supabase/supabase-js';

// Usiamo import.meta.env perché Astro usa Vite. 
// In produzione, potremmo dover instanziare il client ad ogni richiesta SSR se ci serve il contesto dell'utente.
// Per ora creiamo un client anonimo (anon key) di base.

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
