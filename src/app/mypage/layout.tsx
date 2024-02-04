// import { ListenToAuth } from "@/utils/actions";
// import { supabase_sc } from "@/utils/supabase-ss";

// const MypageLayout = async ({ children }: { children: React.ReactNode }) => {
//   ListenToAuth();
//   const supabase = supabase_sc();
//   const { data } = await supabase.auth.getSession();
//   const session = data.session;

//   console.log("session", session);
//   return (
//     <div>
//       {children} {session ? "ログイン中" : "ログアウトしました"}
//     </div>
//   );
// };

// export default MypageLayout;

"use client";

import { SessionContext } from "@/components/providers";
import { supabase_br } from "@/utils/supabase-cs";
import { useContext, useEffect } from "react";

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  const { session, setSession } = useContext(SessionContext);
  return (
    <div>
      {children} {session ? "ログイン中" : "ログアウトしました"}
    </div>
  );
};

export default MypageLayout;
