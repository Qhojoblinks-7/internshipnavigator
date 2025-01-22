import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '/api/rest/v1'; // Use proxy path
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Keep the key secure

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
