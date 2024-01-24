import Image from "next/image";

const ThreadsList = () => {
  const threads = [
    {
      image: "/pokemon.png",
      alt: "",
      description: "ポポケモン",
      number: "",
      url: "",
    },
    {
      image: "/pokemon.png",
      alt: "",
      description: "ポポケモン",
      number: "",
      url: "",
    },
    { image: "/pokemon.png", alt: "", description: "", number: "", url: "" },
    { image: "/pokemon.png", alt: "", description: "", number: "", url: "" },
  ];

  return (
    <>
      {threads.map((thread, index) => (
        <div key={index} className="mx-10 my-5 flex cursor-pointer">
          <Image width={300} height={200} alt={thread.alt} src={thread.image} />
          <p>{thread.description}</p>
        </div>
      ))}
    </>
  );
};

export default ThreadsList;
