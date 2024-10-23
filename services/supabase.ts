import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rrmpfztggyrxpgllacbw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybXBmenRnZ3lyeHBnbGxhY2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NjY3ODQsImV4cCI6MjA0MzA0Mjc4NH0.Z1f9QCHJOx-4YMjjYbzicUJsOjnOodwi4DuHq6J8fuw";
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseStorageEndpoint = `${supabaseUrl}/storage/v1/upload/resumable`;

export default supabase;
export { supabaseKey, supabaseUrl, supabaseStorageEndpoint };
