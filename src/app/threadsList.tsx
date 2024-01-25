import Image from "next/image";
import Link from "next/link";

const ThreadsList = () => {
  const threads = [
    {
      id: 1,
      image: "/pokemon.png",
      alt: "",
      description: "ポケモン",
      number: "",
      url: "",
    },
    {
      id: 2,
      image: "/pokemon.png",
      alt: "",
      description: "",
      number: "",
      url: "",
    },
    {
      id: 3,
      image: "/pokemon.png",
      alt: "",
      description: "",
      number: "",
      url: "",
    },
    {
      id: 4,
      image: "/pokemon.png",
      alt: "",
      description: "",
      number: "",
      url: "",
    },
  ];

  const hotThreads = [
    { title: "アナザーコード", episode: "3期2話", number: 10 },
    { title: "パルワールド", episode: "1期1話", number: 3 },
    { title: "私の幸福資本論", episode: "10期24話", number: 2 },
  ];

  return (
    <div className="flex">
      <div className="w-52 lg:w-1/5">
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
      <div className="lg:w-3/5 lg:px-20 relative">
        {threads.map((thread, index) => (
          <Link
            href={`/threads/${thread.id}`}
            key={index}
            className="flex mx-10 my-5 cursor-pointer relative"
          >
            <Image
              width={300}
              height={200}
              alt={thread.alt}
              src={thread.image}
              className="relative"
            />
            <p className="absolute top-0 left-0 hidden sm:inline-block bg-opacity-75 bg-gray-800 p-2 text-white">
              {thread.description}
            </p>
          </Link>
        ))}
      </div>
      <div className="hidden lg:block lg:w-1/5">
        <div>あかん</div>
        <div>あかん</div>
        <div>あかん</div>
      </div>
    </div>
  );
};

export default ThreadsList;
