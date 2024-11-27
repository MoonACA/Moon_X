import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bakurgmtpedjcnadobmy.supabase.co";

const supabaseKey = process.env.SUPABASE_KEY || "";
if (!supabaseKey) {
  throw new Error("Supabase key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseStorageEndpoint = `${supabaseUrl}/storage/v1/upload/resumable`;

export default supabase;
export { supabaseKey, supabaseUrl, supabaseStorageEndpoint };
