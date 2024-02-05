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
import { redirect } from "next/navigation";
import { useContext } from "react";

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useContext(SessionContext);

  if (session) {
    return (
      <div>
        {children} {session ? "ログイン中" : "ログアウトしました"}
      </div>
    );
  } else {
    redirect("/account?=login");
  }
};

export default MypageLayout;
