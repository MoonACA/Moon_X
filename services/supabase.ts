import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bakurgmtpedjcnadobmy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha3VyZ210cGVkamNuYWRvYm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MjEwNDYsImV4cCI6MjA0NTQ5NzA0Nn0.hz8M-uvkhwcuN7G6uiKmUZLfEfEEPeO7QS61KxMH1rg";
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseStorageEndpoint = `${supabaseUrl}/storage/v1/upload/resumable`;

export default supabase;
export { supabaseKey, supabaseUrl, supabaseStorageEndpoint };
