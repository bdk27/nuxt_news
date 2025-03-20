import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kadqaazihpvuhwezyfbk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZHFhYXppaHB2dWh3ZXp5ZmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyODM3NTgsImV4cCI6MjA1Nzg1OTc1OH0.y2gcmPu1O15Y_S9nXAhTxbED2OtcgKxgPQ9V_PRMi4c";

export const supabase = createClient(supabaseUrl, supabaseKey);
