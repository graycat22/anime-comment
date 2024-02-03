"use client";

import Navibar from "@/components/navbar";
import { signOut } from "@/utils/supabase-cs";

const Mypage = () => {
  return (
    <main>
      <Navibar color="red" />
      <button
        onClick={signOut}
        className="m-10 border-3 p-4 bg-slate-300 rounded-2xl"
      >
        ログアウト
      </button>
    </main>
  );
};

export default Mypage;
