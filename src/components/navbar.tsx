"use client";

import { Navbar, Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "./providers";
import { signOut } from "@/utils/supabase-cs";

const Navibar = ({ color }: { color: string }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const { session } = useContext(SessionContext);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  console.log("session!!!", session);

  const navList = (
    <ul className="mt-2 mb-4 mx-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h2"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center text-stone-900">
          今期アニメ
        </a>
      </Typography>
      <Typography
        as="li"
        variant="h2"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center text-stone-900">
          前期アニメ
        </a>
      </Typography>
      <Typography
        as="li"
        variant="h2"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center text-stone-900">
          過去ログ
        </a>
      </Typography>
      {/* <Typography
        as="li"
        variant="h2"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center text-stone-900">
          ♨️スレッド
        </a>
      </Typography> */}
    </ul>
  );

  const handleOpenNav = () => {
    if (window.innerWidth >= 960) {
      return;
    } else {
      setOpenNav(!openNav);
    }
  };
  return (
    <div id="navibar">
      <Navbar className="mx-auto py-2 lg:py-4" placeholder="">
        <div
          className="container mx-auto flex items-center justify-between text-blue-gray-900 cursor-pointer lg:cursor-default"
          onClick={handleOpenNav}
        >
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
            placeholder=""
          >
            <Image width={300} height={200} alt="" src="/anikome.webp" />
          </Typography>
          <div className="hidden lg:block">{navList}</div>
          <div className="mx-auto pl-12 md:pl-20 lg:hidden text-stone-900">
            アニコメ
          </div>
          <div className="flex items-center gap-x-2">
            <>
              {session ? (
                <>
                  <Link
                    href="/mypage"
                    className="hidden mr-3 lg:inline-block text-stone-900"
                  >
                    <button className="relative w-12 h-12 p-2 border-2 border-neutral-800 rounded-full hover:bg-">
                      <svg
                        className="absolute top-[10px] left-[10px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width={24}
                        height={24}
                      >
                        <path
                          fill="rgb(38 38 38)"
                          d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <div className="hidden lg:inline-block w-12 text-stone-900">
                    <button
                      onClick={signOut}
                      className="w-full p-2 rounded-xl hover:bg-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="rgb(138 138 138)"
                          d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/account?form=login" className="w-full">
                    <Button
                      variant="text"
                      size="sm"
                      placeholder=""
                      className="hidden w-24 text-stone-900 bg-gray-200 rounded-md lg:inline-block"
                    >
                      <span>ログイン</span>
                    </Button>
                  </Link>
                  <Link href="/account?form=signup" className="w-full">
                    <Button
                      variant="gradient"
                      size="sm"
                      placeholder=""
                      className="hidden w-[120px] text-stone-900 bg-gray-200 rounded-md lg:inline-block"
                    >
                      <span>サインアップ</span>
                    </Button>
                  </Link>
                </>
              )}
            </>
          </div>
          <div
            className="ml-auto mr-3 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-stone-900"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-stone-900"
                fill="black"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </div>
        </div>
        {openNav && (
          <nav className="duration-500 ease-in-out">
            <div className="container mx-auto">
              {navList}
              <div className="flex items-center gap-x-2 mx-2">
                <Link href="/account?form=login" className="w-full">
                  <Button
                    className="w-full border-2 rounded-md text-stone-900"
                    fullWidth
                    variant="text"
                    size="sm"
                    placeholder=""
                  >
                    <span>ログイン</span>
                  </Button>
                </Link>
                <Link href="/account?form=signup" className="w-full">
                  <Button
                    className="w-full border-2 rounded-md text-stone-900"
                    fullWidth
                    variant="text"
                    size="sm"
                    placeholder=""
                  >
                    <span>サインアップ</span>
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </Navbar>
      {openNav && (
        <div className={`w-full h-2 wavy-border-${color} my-4`}></div>
      )}
    </div>
  );
};

export default Navibar;
