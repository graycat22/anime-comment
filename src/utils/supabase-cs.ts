import { createBrowserClient } from "@supabase/ssr";

export const supabase_br = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const signOut = async () => {
  const supabase = supabase_br;
  await supabase.auth.signOut();
};
