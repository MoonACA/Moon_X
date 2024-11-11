import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bakurgmtpedjcnadobmy.supabase.co";

const supabaseKey: string | undefined = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error("Supabase key is missing.");
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey
  //process.env.NEXT_PUBLIC_SUPERBASE_KEY
);

const supabaseStorageEndpoint = `${supabaseUrl}/storage/v1/upload/resumable`;

export default supabase;
export { supabaseKey, supabaseUrl, supabaseStorageEndpoint };
