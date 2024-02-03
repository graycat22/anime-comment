"use client";

import Navibar from "@/components/navbar";
import ThreadsList from "../components/threads_list";

const Home = () => {
  return (
    <main>
      <Navibar color="red" />
      <ThreadsList />
    </main>
  );
};

export default Home;
