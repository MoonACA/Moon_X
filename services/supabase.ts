import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bakurgmtpedjcnadobmy.supabase.co";

const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZmVxeWRkeHpvbndmbWJ1YXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0ODM0NjYsImV4cCI6MjA0MjA1OTQ2Nn0.I6yqcEFOsRN5lqciRQgXT5YjqaEo1gkRbILe_arufjI";
if (!supabaseKey) {
  throw new Error("Supabase key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseStorageEndpoint = `${supabaseUrl}/storage/v1/upload/resumable`;

export default supabase;
export { supabaseKey, supabaseUrl, supabaseStorageEndpoint };
