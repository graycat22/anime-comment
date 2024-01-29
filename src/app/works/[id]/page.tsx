"use client";

import { access_token } from "@/utils/client-fn";
import Link from "next/link";
import { useEffect, useState } from "react";

const Work = ({ params }: { params: { id: number } }) => {
  const [work, setWork] = useState<any>([]);
  const [episodes, setEpisodes] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.annict.com/v1/works?access_token=${access_token}&filter_ids=${params.id}`
      );
      const data = await res.json();
      setWork(data.works[0]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.annict.com/v1/episodes?access_token=${access_token}&filter_work_id=${params.id}&sort_sort_number=asc
        `
      );
      const data = await res.json();
      setEpisodes(data.episodes);
    };

    fetchData();
  }, []);

  console.log(work);
  console.log(episodes);

  return (
    <div>
      <div className="flex justify-center items-center h-20 mb-4">
        {work.title}
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {episodes.map((episode: any) => (
          <Link
            key={episode.id}
            href={`/works/episodes/${episode.id}`}
            className="relative w-[300px] h-[100px] p-3 border-b-2 cursor-pointer duration-100 hover:rounded-md  hover:bg-gray-600 hover:bg-opacity-25"
          >
            <span className="triangle absolute -z-10 opacity-70"></span>
            <p className="ml-10">{episode.title}</p>
            <p className="absolute bottom-1 left-4">
              episode {episode.number_text}
            </p>
            <p className="absolute bottom-1 right-1">( XX コメント)</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Work;
