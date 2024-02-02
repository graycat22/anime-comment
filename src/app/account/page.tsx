import LoginSignup from "@/components/login_signup";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const Login = () => {
  return (
    <Suspense>
      <div className="flex">
        <Link href="/" className="w-full h-full">
          <Image width={300} height={200} alt="" src="/anikome.webp" />
        </Link>
        <div className="flex justify-center items-center w-full">
          <h2 className="text-xl font-semibold">ログイン</h2>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <div className="flex justify-center items-center text-xl w-16 h-16 mx-2 p-3 rounded-lg cursor-pointer duration-150 hover:bg-red-300">
            <span>→</span>
          </div>
          <div className="flex justify-center items-center text-xl w-16 h-16 mx-2 p-3 rounded-lg cursor-pointer duration-150 hover:bg-red-300">
            <span>←</span>
          </div>
        </div>
      </div>
      <LoginSignup />
    </Suspense>
  );
};

export default Login;
