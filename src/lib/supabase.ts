import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('URL env:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Anon key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
