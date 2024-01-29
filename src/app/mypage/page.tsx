"use client";

import Navibar from "@/components/navbar";
import ThreadsList from "../../components/threadsList";

const Mypage = () => {
  return (
    <main>
      <Navibar color="red" />
      <ThreadsList />
    </main>
  );
};

export default Mypage;
