import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/models/database.types";

export default createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);