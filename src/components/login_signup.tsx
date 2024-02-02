"use client";

import { signUp } from "@/utils/actions";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

type FormType = "login" | "signup";
const initialState = { message: "" };

const LoginSignup = () => {
  const [state, action] = useFormState(signUp, initialState);
  const [loginOrSigup, setLoginOrSignup] = useState<FormType>("login");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const params = useSearchParams();
  console.log("params", params.toString());

  if (!params.toString()) {
    redirect("/account?form=login");
  }

  useEffect(() => {
    const query = params.get("form");
    if (query === "login") {
      setLoginOrSignup("login");
    } else if (query === "signup") {
      setLoginOrSignup("signup");
    } else {
      redirect("/account?form=login");
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickLoginOrSignup = (event: React.FormEvent) => {
    event.preventDefault();
    if (loginOrSigup === "login") {
      setLoginOrSignup("signup");
      router.push("/account?form=signup");
    } else if (loginOrSigup === "signup") {
      setLoginOrSignup("login");
      router.push("/account?form=login");
    }
  };

  console.log("state", state);

  return (
    <div className="fixed flex justify-center w-full h-[calc(100%-300px)]">
      <div className="relative w-[400px] sm:w-[500px] md:w-[600px] lg:w-[800px]">
        <form action={action}>
          <div className="flex flex-col gap-7 m-5">
            <div className="flex flex-col">
              {loginOrSigup === "signup" && (
                <>
                  <label className="my-3">なまえ</label>
                  <input
                    name="display_name"
                    type="text"
                    className="border-2 active:border-red-500 h-12 rounded-lg px-3 text-lg"
                  />
                </>
              )}
            </div>
            <div className="flex flex-col">
              <label className="my-3">メール</label>
              <input
                name="email"
                type="email"
                className="border-2 active:border-red-500 h-12 rounded-lg px-3 text-lg"
              />
            </div>
            <div className="relative">
              <div className="flex flex-col">
                <label className="my-3">パスワード</label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="border-2 active:border-red-500 h-12 rounded-lg px-3 text-lg"
                />
              </div>
              <button
                type="button"
                className="absolute top-14 right-3 mt-[2px] w-8"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <div className="mt-[1px] text-xl font-semibold">
                    <span>ー</span>
                  </div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center pt-10 mx-9 text-[15px]">
            <div className="w-full h-[1px] m-auto bg-slate-400"></div>
            <button
              onClick={handleClickLoginOrSignup}
              className="whitespace-nowrap mx-2"
            >
              {loginOrSigup === "login" ? "登録" : "ログイン"}はこちら
            </button>
            <div className="w-full h-[1px] m-auto bg-slate-400"></div>
          </div>
          <div className="flex justify-center w-full mt-[56px] mb-8">
            <button
              type="submit"
              className="w-80 h-12 rounded-lg border-2 duration-150 hover:bg-gray-300"
            >
              {loginOrSigup === "login" ? "ログイン" : "サインアップ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
