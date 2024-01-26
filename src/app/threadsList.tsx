"use client";

import { recursiveGetWorks } from "@/utils/client-fn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ThreadsList = () => {
  const [allAnime, setAllAnime] = useState<any[]>([]);

  //? process.envはおそらくサーバーサイドでのみ使用可能
  // console.log("console", process.env.ANNICT_TOKEN)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = "amksM34Jh76lsXGuXlxxl_bfkzeb8pYgCaJ04n6y-9M";
        const works = await recursiveGetWorks(1, accessToken);

        //* データ整形

        setAllAnime(works);
      } catch (error) {
        console.log("エラーが発生しました", error);
      }
    };

    fetchData();
  }, []);

  const unchi = (
    <>
      <button>wanna_watch 見たい</button>
      <button>watching 見てる</button>
      <button>watched 見た</button>
      <button>stop_watching 視聴中止</button>
      <button>on_hold 一時中断</button>
    </>
  );

  const hotThreads = [
    { title: "アナザーコード", episode: "3期2話", number: 10 },
    { title: "パルワールド", episode: "1期1話", number: 3 },
    { title: "私の幸福資本論", episode: "10期24話", number: 2 },
  ];

  return (
    <>
      <div className="flex">
        <div className="w-1/3 lg:w-[25%] mx-auto">
          <div className="m-4 p-2 border-2 rounded-md flex justify-center">
            ホットなスレッド
          </div>
          {hotThreads.map((thread, index) => (
            <div key={index} className="m-5 pb-5 border-b-2">
              <h3>{thread.title}</h3>
              <p>{thread.episode}</p>
              <p>( {thread.number} コメント)</p>
            </div>
          ))}
        </div>

        <div className="mx-auto lg:w-[50%] relative">
          <div className="flex justify-end">
            <div className="hidden sm:flex gap-2 mx-auto">
              <button className="px-2 border-2 rounded-md">見たい</button>
              <button className="px-2 border-2 rounded-md">見てる</button>
              <button className="px-2 border-2 rounded-md">見た</button>
              <button className="px-2 border-2 rounded-md">視聴中止</button>
              <button className="px-2 border-2 rounded-md">一時中断</button>
            </div>
            {/* スマホ表示が下*/}
            <div className="sm:hidden mr-5">
              <select className="py-1 px-2 border-2 rounded-md focus:outline-none focus:border-pink-500 bg-pink-100 text-pink-700">
                <option className="px-2 border-2 rounded-md">見たい</option>
                <option className="px-2 border-2 rounded-md">見てる</option>
                <option className="px-2 border-2 rounded-md">見た</option>
                <option className="px-2 border-2 rounded-md">視聴中止</option>
                <option className="px-2 border-2 rounded-md">一時中断</option>
              </select>
            </div>
          </div>
          {allAnime.map((anime, index) => (
            <Link
              href={`/threads/${anime.id}`}
              key={index}
              className="relative flex mx-3 my-5 cursor-pointer"
            >
              {anime.images ? (
                <Image
                  width={300}
                  height={200}
                  alt={anime.alt}
                  src={
                    "https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_bigger.png"
                  }
                  className="ring-2 ring-[#eC7871] rounded-sm"
                />
              ) : (
                <div className="flex relative w-[300px] h-[168px] bg-stone-400/80 ring-2 ring-[#6C7871] rounded-sm">
                  <p className="m-auto italic text-stone-100">N/A</p>
                  <div className="absolute bottom-0 w-full flex justify-between px-1 text-sm">
                    <p className="">ID: {anime.id}</p>
                    <p className="">Status: {anime.status.kind}</p>
                  </div>
                </div>
              )}
              <p className="absolute top-0 left-0 w-[300px] md:hidden bg-opacity-75 bg-gray-800 p-2 text-white">
                {anime.title}
              </p>
              <p className="hidden md:inline-block w-[200px]">{anime.title}</p>
            </Link>
          ))}
        </div>

        <div className="hidden lg:block lg:w-[25%] mx-auto">
          <div>あかん</div>
          <div>あかん</div>
          <div>あかん</div>
        </div>
      </div>
    </>
  );
};

export default ThreadsList;
