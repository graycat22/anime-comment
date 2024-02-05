"use client";

import {
  access_token,
  compareFunction,
  countSameIds,
  findLatestObject,
  recursiveGetWorks,
} from "@/utils/functions-cs";
import { StatusType } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { SessionContext } from "./providers";
import { supabase_br } from "@/utils/supabase-cs";

const ThreadsList = () => {
  const { session } = useContext(SessionContext);
  const [allAnime, setAllAnime] = useState<any[]>([]);
  const [currentAllAnime, setCurrentAllAnime] = useState<any[]>([]);
  const [animeStatus, setAnimeStatus] = useState<StatusType>();
  const [latestData, setLatestData] = useState<any>([]);
  const [numberOfComments, setNumberOfComments] = useState<
    { work_id: number; number: number }[]
  >([]);
  const topRef = useRef<HTMLDivElement>(null);

  //? process.envはおそらくサーバーサイドでのみ使用可能
  // console.log("console", process.env.ANNICT_TOKEN)

  // Annictから自分のアニメ情報を全て引っ張ってくる
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
        console.log(
          "Annictから自分のアニメ情報を全て引っ張ってくる途中にエラーが発生しました",
          error
        );
      }
    };
    fetchData();
  }, []);

  //? データベースから最近更新したスレッドを15件取得 //////////////////////////////////
  useEffect(() => {
    const fetchThreads = async () => {
      //* まずは50コメント取得する /////////////////////////////////////
      let threads: any[] | null = null;

      if (session) {
        const { data } = await supabase_br
          .from("Comments")
          .select()
          .eq("user_id", session?.user.id)
          .range(0, 10);
        console.log("session?.user.id", threads);
        threads = data;
      } else {
        const { data } = await supabase_br
          .from("Comments")
          .select()
          .range(0, 100);
        console.log("threads", threads);
        threads = data;
      }

      //* 最近コメントした投稿 /////////////////////////////////////////
      const latestThread = threads?.map((comment) => ({
        work_id: comment.work_id,
        episode_id: comment.episode_id,
        created_at: comment.created_at,
      }));
      console.log("latestThread", latestThread);

      //* 同じエピソードIDの作品を最大15件探す ///////////////////////////
      const sameEpisodeId = Array.from(
        new Set(latestThread?.map((item) => item.episode_id))
      )
        .map((episodeId) => ({
          episode_id: episodeId,
          works: latestThread?.filter((item) => item.episode_id === episodeId),
          count: latestThread?.filter((item) => item.episode_id === episodeId)
            .length,
          created_at: findLatestObject(
            latestThread?.filter((item) => item.episode_id === episodeId)
          ).created_at,
        }))
        .slice(0, 14);
      console.log("sameEpisodeId", sameEpisodeId);

      //* Annict に何期何話かをフェッチする ///////////////////////////////
      const res =
        await fetch(`https://api.annict.com/v1/episodes?access_token=${access_token}&filter_ids=${sameEpisodeId
          .map((item) => item.episode_id)
          .join(",")}
          `);
      const anime = await res.json();
      console.log("episodes", anime.episodes);

      //* annict 得られた anime からアニメ名と何話かをプロパティに付ける /////
      const hotThreads = sameEpisodeId.map((episode) => {
        const correspondingAnime = anime.episodes.find(
          (item: any) => item.id === Number(episode.episode_id)
        );
        if (correspondingAnime) {
          return {
            ...episode,
            work_title: correspondingAnime.work.title,
            episode_title: correspondingAnime.title,
            number: correspondingAnime.number_text,
          };
        }
      });
      console.log("hotThreads", hotThreads);

      setLatestData(hotThreads);
    };

    fetchThreads();
  }, [session]);

  //? 作品の ID がゲット出来たら、コメントを取得する /////////////////////////
  useEffect(() => {
    const fetchNumber = async () => {
      const { data, error } = await supabase_br
        .from("Comments")
        .select("work_id");
      if (error) {
        return console.log(`${error}というエラーが起きました`);
      }
      console.log("*, counts", data, countSameIds(data));
      setNumberOfComments(countSameIds(data));
    };

    fetchNumber();
  }, [allAnime]);

  //? ------------------------------------------------------------------------
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

  // トップへ戻るボタン
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 下に行くボタン
  const scrollToBottom = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <>
      <div ref={topRef} className="flex">
        <div className="w-1/3 lg:w-[25%] mx-auto text-sm">
          <div className="ml-2">
            <div className="sm:hidden m-4 p-2 border-2 rounded-md flex justify-center">
              HOT
            </div>
            <div className="hidden m-4 p-2 border-2 rounded-md sm:flex justify-center">
              {session ? "最近" : "ホットなスレッド"}
            </div>
          </div>
          <>
            {latestData
              .sort(compareFunction)
              .reverse()
              .map((thread: any, index: number) => (
                <Link
                  href={`#`}
                  key={index}
                  className="relative block group ml-3 sm:m-5 py-2"
                >
                  <h3 className="pl-3 border-r-2 border-b-2 rounded-lg border-red-300 duration-300 sm:group-hover:pl-12 md:group-hover:pl-16 lg:group-hover:pl-20 group-hover:bg-red-200 group-hover:border-red-200">
                    {thread.work_title}
                  </h3>
                  <div className="flex justify-center duration-150 text-center">
                    <p className="w-fit px-1 rounded-b-md bg-red-300 border-b-2 border-red-300 text-white font-semibold duration-100 group-hover:text-[12px]">
                      {thread.number}
                    </p>
                  </div>
                  <div className="flex mt-1">
                    <p className="ml-1 items-start text-gray-500/90">: :</p>
                    <span className="left-5">{thread.episode_title}</span>
                  </div>
                  <p className="absolute bottom-[6px] -left-1 text-[11px] text-yellow-600/90">
                    {index === 0 && thread.count && "最新♪"}
                  </p>
                  <p className="text-xs text-right mt-1">
                    ( {thread.count} コメ)
                  </p>
                  <span className="absolute bottom-0 -left-7 -z-10 w-16 h-16 rounded-full bg-transparent group-hover:bg-gray-200 group-hover:left-12 duration-500"></span>
                </Link>
              ))}
          </>
        </div>

        <div className="mx-auto lg:w-[50%] relative pb-8">
          <div className="flex justify-end mt-4 mb-1">
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
                className="py-1 px-2 border-2 rounded-md focus:outline-none focus:border-indigo-300 text-red-500"
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
            <div key={index} className="flex justify-center duration-200">
              <div className="px-1 rounded-3xl duration-200 hover:bg-red-300 outline-dotted outline-transparent outline-offset-1 hover:outline-red-300">
                <Link
                  href={`/works/${anime.id}/episodes`}
                  className="flex justify-center mx-3 my-4 cursor-pointer"
                >
                  <div className="relative flex">
                    {anime.images ? (
                      <Image
                        width={300}
                        height={200}
                        alt=""
                        src="/pokemon.png"
                        className="ring-2 ring-red-300 rounded-sm"
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

                    <p className="absolute top-0 left-0 w-full md:w-[300px] bg-opacity-75 bg-gray-800 p-2 text-white">
                      {anime.title}
                    </p>
                    <div className="relative flex flex-col md:w-[250px] lg:w-[350px] h-full">
                      <p className="hidden md:inline-block px-3 text-red-500">
                        ({" "}
                        {numberOfComments.find(
                          (item) => item.work_id === anime.id
                        )?.number || 0}{" "}
                        コメント)
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
            </div>
          ))}

          <div className="fixed bottom-3 left-3 z-10 flex gap-3 text-white">
            <div className="px-2 py-1 bg-[#ff7a7a]/80 rounded-md text-white">
              作品数 : {allAnime.length}
            </div>
            <button
              onClick={scrollToTop}
              className="relative flex justify-center w-10 bg-[#ff7a7a]/80 rounded-[10px]"
            >
              <svg
                className="absolute w-4 top-[6px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="white"
                  d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                />
              </svg>
            </button>
            <button
              onClick={scrollToBottom}
              className="relative flex justify-center w-10 bg-[#ff7a7a]/80 rounded-[10px]"
            >
              <svg
                className="absolute w-4 top-[6px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="white"
                  d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                />
              </svg>
            </button>
          </div>
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
