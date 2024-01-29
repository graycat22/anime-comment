"use client";

import Navibar from "@/components/navbar";
import ThreadsList from "../components/threadsList";

const Home = () => {
  return (
    <main>
      <Navibar color="red" />
      <ThreadsList />
    </main>
  );
};

export default Home;
