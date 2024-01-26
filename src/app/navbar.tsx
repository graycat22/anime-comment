"use client";

import { Navbar, Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navibar = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 mx-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
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
        variant="small"
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
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center text-stone-900">
          過去ログ
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center text-stone-900">
          ♨️スレッド
        </a>
      </Typography>
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
    <div>
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
          <div className="flex items-center gap-x-2">
            <Link href="/mypage" className="w-full">
              <Button
                variant="text"
                size="sm"
                placeholder=""
                className="hidden w-24 text-stone-900 bg-gray-200 rounded-md lg:inline-block"
              >
                <span>ログイン</span>
              </Button>
            </Link>
            <Link href="/mypage" className="w-full">
              <Button
                variant="gradient"
                size="sm"
                placeholder=""
                className="hidden w-[120px] text-stone-900 bg-gray-200 rounded-md lg:inline-block"
              >
                <span>サインアップ</span>
              </Button>
            </Link>
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
                <Link href="/mypage" className="w-full">
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
                <Link href="/mypage" className="w-full">
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
      {openNav && <div className="w-full h-2 wavy-border my-4"></div>}
    </div>
  );
};

export default Navibar;
