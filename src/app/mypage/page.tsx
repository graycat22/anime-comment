"use client";

import { useEffect, useState } from "react";
import ThreadsList from "../threadsList";
import Navibar from "../navbar";
import { recursiveGetWorks } from "@/utils/client-fn";

const Mypage = () => {
  const [allAnime, setAllAnime] = useState<any[]>([]);

  //? process.envはおそらくサーバーサイドでのみ使用可能
  // console.log("console", process.env.ANNICT_TOKEN)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = "amksM34Jh76lsXGuXlxxl_bfkzeb8pYgCaJ04n6y-9M";
        const works = await recursiveGetWorks(1, accessToken);
        setAllAnime(works);
      } catch (error) {
        console.log("エラーが発生しました", error);
      }
    };

    fetchData();
  }, []);

  console.log("あにめ", allAnime);

  return (
    <main>
      <Navibar />
      <ThreadsList />
    </main>
  );
};

export default Mypage;
