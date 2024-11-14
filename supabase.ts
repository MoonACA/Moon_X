import { createClient } from "@supabase/supabase-js";

const superbaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const superbaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(superbaseUrl, superbaseKey);

export default supabase;
