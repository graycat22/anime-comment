"use client";

import { useEffect, useState } from "react";

const recursiveGetWorks: (
  nextPage: number,
  accessToken: string
) => Promise<any[]> = async (nextPage, accessToken) => {
  const result = [];
  const response = await fetch(
    `https://api.annict.com/v1/me/works?page=${nextPage}&per_page=50&access_token=${accessToken}`
  );

  const responseData = await response.json();
  result.push(...responseData.works);

  const nextPageData = responseData.next_page;

  if (nextPageData !== null) {
    result.push(...(await recursiveGetWorks(nextPageData, accessToken)));
  }

  return result;
};

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

  return <div>Enter</div>;
};

export default Mypage;
