"use client";

import { access_token, countSameIds } from "@/utils/functions-cs";
import { supabase_br } from "@/utils/supabase-cs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Work = ({ params }: { params: { work_id: number } }) => {
  const [work, setWork] = useState<any>([]);
  const [episodes, setEpisodes] = useState<any>([]);
  const [comments, setComments] = useState<any[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.annict.com/v1/works?access_token=${access_token}&filter_ids=${params.work_id}`
      );
      const data = await res.json();
      setWork(data.works[0]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.annict.com/v1/episodes?access_token=${access_token}&filter_work_id=${params.work_id}&sort_sort_number=asc
        `
      );
      const data = await res.json();
      setEpisodes(data.episodes);
    };

    fetchData();
  }, []);

  //? 作品の ID がゲット出来たら、コメントを取得する ---------------------
  useEffect(() => {
    const fetchNumber = async () => {
      const { data, error } = await supabase_br
        .from("Comments")
        .select()
        .eq("work_id", params.work_id);
      if (error) {
        return console.log(`${error}というエラーが起きました`);
      }
      console.log("comments", data);
      setComments(data);
    };

    fetchNumber();
  }, []);

  console.log(work);
  console.log(episodes);

  return (
    <div>
      <Link
        href={`/works/${params.work_id}`}
        className="flex justify-center items-center h-20 mb-4"
      >
        {work.title}
      </Link>
      <div className="flex flex-wrap justify-center gap-5 mb-4">
        {episodes.map((episode: any) => (
          <Link
            key={episode.id}
            href={`${pathname}/${episode.id}`}
            className="relative group w-[300px] h-[100px] p-3 border-b-2 cursor-pointer duration-100 hover:rounded-md hover:bg-gray-600 hover:bg-opacity-25 hover:border-violet-300"
          >
            <span className="triangle absolute -z-10 opacity-70"></span>
            <p className="ml-10 group-hover:mt-1 group-hover:pl-1 group-hover:text-gray-800 duration-150">
              {episode.title}
            </p>
            <p className="absolute bottom-1 left-4 text-sm">
              episode :: {episode.number_text}
            </p>
            <p className="absolute bottom-1 right-1">
              <span
                className={
                  comments.filter(
                    (comment) => Number(comment.episode_id) === episode.id
                  ).length === 0
                    ? "text-gray-800"
                    : "text-violet-500"
                }
              >
                {" "}
                {
                  comments.filter(
                    (comment) => Number(comment.episode_id) === episode.id
                  ).length
                }{" "}
              </span>
              コメント
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Work;
