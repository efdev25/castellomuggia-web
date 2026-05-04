import { supabase } from './client';
import type { Product } from '@core/types/product';

/**
 * Tutte le chiamate al database passano di qui.
 * Le UI pages (Astro) o i componenti non sanno che esiste Supabase,
 * chiamano solo queste funzioni dell'Adapter.
 */

export async function getProducts(category?: Product['category']): Promise<Product[]> {
  let query = supabase.from('products').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }

  try {
    const { data, error } = await query;

    if (error) {
      console.error('Errore durante il fetch dei prodotti:', error);
      return [];
    }

    return data as Product[];
  } catch (error) {
    console.warn('Connessione a Supabase fallita (URL placeholder?). Ritorno prodotti MOCK per test UI.');
    return [
      { id: '1', name: 'Terrano del Castello Riserva', description: 'Vino rosso autoctono dal profumo intenso, invecchiato nelle cantine storiche.', price: 28.50, stock: 120, category: 'wine', createdAt: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { id: '2', name: 'Olio d\'Oliva DOP', description: 'Olio extravergine di oliva estratto a freddo dagli ulivi secolari della tenuta.', price: 18.00, stock: 50, category: 'merch', createdAt: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
      { id: '3', name: 'Biglietto Visita Guidata', description: 'Accesso completo al castello con guida dedicata. Valido per una persona.', price: 12.00, stock: 999, category: 'ticket', createdAt: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
    ];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data as Product;
}
