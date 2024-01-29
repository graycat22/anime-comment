"use client";

import { access_token } from "@/utils/client-fn";
import { useEffect, useState } from "react";

const Work = ({ params }: { params: { id: number } }) => {
  const [work, setWork] = useState<[]>([]);
  const [episodes, setEpisodes] = useState<[]>([]);

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

  return <div></div>;
};

export default Work;
