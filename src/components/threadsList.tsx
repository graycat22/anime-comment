"use client";

import { access_token, recursiveGetWorks } from "@/utils/client-fn";
import { StatusType } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ThreadsList = () => {
  const [allAnime, setAllAnime] = useState<any[]>([]);
  const [currentAllAnime, setCurrentAllAnime] = useState<any[]>([]);
  const [animeStatus, setAnimeStatus] = useState<StatusType>();

  //? process.envはおそらくサーバーサイドでのみ使用可能
  // console.log("console", process.env.ANNICT_TOKEN)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sessionStorage.getItem("allAnime")) {
          // sessionStorageにallAnimeがある場合はそれをステートにセット
          setAllAnime(JSON.parse(sessionStorage.getItem("allAnime")!));
          setCurrentAllAnime(JSON.parse(sessionStorage.getItem("allAnime")!));
        } else {
          const works = await recursiveGetWorks(1, access_token);
          setAllAnime(works);
          setCurrentAllAnime(works);
          sessionStorage.setItem("allAnime", JSON.stringify(works));
        }
      } catch (error) {
        console.log("エラーが発生しました", error);
      }
    };
    fetchData();
  }, []);

  const handleClickStatus = (status: StatusType) => {
    if (status === animeStatus) {
      setAnimeStatus(undefined);
      setCurrentAllAnime(allAnime);
    } else {
      setAnimeStatus(status);
      setCurrentAllAnime(sameStatus(allAnime, status));
    }
  };

  // select/option の場合
  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as StatusType;
    setAnimeStatus(newStatus);
    if (newStatus === "all") {
      setCurrentAllAnime(allAnime);
    } else {
      setCurrentAllAnime(sameStatus(allAnime, newStatus));
    }
  };

  // 同じstatusの作品だけにする関数
  const sameStatus = (animes: any[], status: StatusType) => {
    return animes.filter((anime) => anime.status.kind === status);
  };

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
              <button
                onClick={() => handleClickStatus("wanna_watch")}
                className={`px-2 py-[3px] border-2 rounded-md hover:border-indigo-300 duration-100 ${
                  animeStatus === "wanna_watch"
                    ? "bg-indigo-300 text-white hover:border-stone-400"
                    : ""
                }`}
              >
                見たい
              </button>
              <button
                onClick={() => handleClickStatus("watching")}
                className={`px-2 py-[3px] border-2 rounded-md hover:border-indigo-300 duration-100 ${
                  animeStatus === "watching"
                    ? "bg-indigo-300 text-white hover:border-stone-400"
                    : ""
                }`}
              >
                見てる
              </button>
              <button
                onClick={() => handleClickStatus("watched")}
                className={`px-2 py-[3px] border-2 rounded-md hover:border-indigo-300 duration-100 ${
                  animeStatus === "watched"
                    ? "bg-indigo-300 text-white hover:border-stone-400"
                    : ""
                }`}
              >
                見た
              </button>
              <button
                onClick={() => handleClickStatus("stop_watching")}
                className={`px-2 py-[3px] border-2 rounded-md hover:border-indigo-300 duration-100 ${
                  animeStatus === "stop_watching"
                    ? "bg-indigo-300 text-white hover:border-stone-400"
                    : ""
                }`}
              >
                視聴中止
              </button>
              <button
                onClick={() => handleClickStatus("on_hold")}
                className={`px-2 py-[3px] border-2 rounded-md hover:border-indigo-300 duration-100 ${
                  animeStatus === "on_hold"
                    ? "bg-indigo-300 text-white hover:border-stone-400"
                    : ""
                }`}
              >
                一時中断
              </button>
            </div>
            {/* スマホ表示が下*/}
            <div className="sm:hidden flex gap-2 mr-2">
              <button className="">新しい順</button>
              <button className="">古い順</button>
            </div>
            <div className="sm:hidden mr-5">
              <select
                value={animeStatus}
                onChange={handleSelectStatus}
                className="py-1 px-2 border-2 rounded-md focus:outline-none focus:border-indigo-300 bg-pink-100 text-pink-700"
              >
                <option value="all" className="px-2 border-2 rounded-md">
                  すべて
                </option>
                <option
                  value="wanna_watch"
                  className="px-2 border-2 rounded-md"
                >
                  見たい
                </option>
                <option value="watching" className="px-2 border-2 rounded-md">
                  見てる
                </option>
                <option value="watched" className="px-2 border-2 rounded-md">
                  見た
                </option>
                <option
                  value="stop_watching"
                  className="px-2 border-2 rounded-md"
                >
                  視聴中止
                </option>
                <option value="on_hold" className="px-2 border-2 rounded-md">
                  一時中断
                </option>
              </select>
            </div>
          </div>
          {currentAllAnime.map((anime, index) => (
            <div key={index} className="flex justify-center">
              <Link
                href={`/works/${anime.id}`}
                className="flex justify-center mx-3 my-5 cursor-pointer"
              >
                <div className="relative flex">
                  {anime.images ? (
                    <Image
                      width={300}
                      height={200}
                      alt=""
                      src="/pokemon.png"
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

                  <p className="absolute top-0 left-0 w-[300px] bg-opacity-75 bg-gray-800 p-2 text-white">
                    {anime.title}
                  </p>
                  <div className="relative flex flex-col md:w-[250px] lg:w-[350px] h-full">
                    <p className="hidden md:inline-block px-3">
                      ( XX コメント)
                    </p>
                    <p className="hidden md:inline-block px-3">
                      全 {anime.episodes_count} 話
                    </p>
                    <p className="hidden md:inline-block px-3">
                      放送時期 : {anime.season_name_text}
                    </p>
                    <p className="hidden md:inline-block absolute bottom-0 px-3">
                      ID : {anime.id}
                    </p>
                    {!animeStatus && (
                      <p className="hidden md:inline-block absolute bottom-0 right-0 px-3">
                        {anime.status.kind === "watching" && "視聴中"}
                        {anime.status.kind === "wanna_watch" && "見たい"}
                        {anime.status.kind === "watched" && "見た"}
                        {anime.status.kind === "stop_watching" && "視聴中止"}
                        {anime.status.kind === "on_hold" && "一時中断"}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden lg:block lg:w-[25%] mx-auto">
          <div>あかん</div>
          <div>あかん</div>
          <div>あかん</div>
        </div>
      </div>
      <div className="fixed bottom-3 left-3 z-10 px-2 py-1 bg-[#ff7a7a]/80 rounded-md text-stone-900">
        作品数 : {allAnime.length}
      </div>
      <div className="fixed bottom-3 right-3 z-10 px-2 py-1 bg-[#ff7a7a]/80 rounded-md text-stone-900">
        トップへ戻る
      </div>
    </>
  );
};

export default ThreadsList;
