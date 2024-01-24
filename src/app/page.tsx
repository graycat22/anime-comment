"use client";

import { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import ThreadsList from "./threadsList";

const Home = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
        placeholder=""
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  const handleOpenNav = () => {
    if (window.innerWidth >= 960) {
    } else {
      setOpenNav(!openNav);
    }
  };

  return (
    <main className="scroll-none">
      <div>
        <Navbar className="mx-auto py-2 lg:py-4" placeholder="">
          <div
            className="container mx-auto flex items-center justify-between text-blue-gray-900 cursor-pointer"
            onClick={handleOpenNav}
          >
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium"
              placeholder=""
            >
              <Image width={300} height={200} alt="" src="/anikome.webp" />
            </Typography>
            <div className="hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                placeholder=""
                className="hidden w-24 bg-gray-200 rounded-md lg:inline-block"
              >
                <span>ログイン</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                placeholder=""
                className="hidden w-24 bg-gray-200 rounded-md lg:inline-block"
              >
                <span>アカウント作成</span>
              </Button>
            </div>
            <IconButton
              placeholder=""
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
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
                  className="h-6 w-6"
                  fill="none"
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
            </IconButton>
          </div>
          {openNav && (
            <nav className="duration-500 ease-in-out">
              <div className="container mx-auto">
                {navList}
                <div className="flex items-center gap-x-1">
                  <Link href="/mypage" className="w-full">
                    <Button
                      className="w-full border-2 rounded-md"
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
                      className="w-full border-2 rounded-md"
                      fullWidth
                      variant="text"
                      size="sm"
                      placeholder=""
                    >
                      <span>アカウント作成</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </Navbar>
      </div>
      <ThreadsList />
    </main>
  );
};

export default Home;
