"use client";

import DeleteDialog from "@/components/delete_dialog";
import { postComment } from "@/utils/actions";
import {
  access_token,
  generateRandomNumber,
  pressKeyDown,
  resizeTextarea,
} from "@/utils/functions-cs";
import { supabase_br } from "@/utils/supabase-cs";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

const initialState = { message: "" };

const EpisodeComment = ({ params }: { params: { episode_id: number } }) => {
  const [state, action] = useFormState(postComment, initialState);
  const [episode, setEpisode] = useState<any>([]);
  const [stickyBar, setStickyBar] = useState<boolean>(false);
  const [comments, setComments] = useState<any>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");
  const [isRevalidate, setIsRevalidate] = useState<number>(0);
  // 直接 DOM 操作
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          await fetch(`https://api.annict.com/v1/episodes?access_token=${access_token}&filter_ids=${params.episode_id}
        `);
        const data = await res.json();
        setEpisode(data.episodes[0]);
      } catch (error) {
        console.log(`${error}というエラーが発生しました`);
      }
    };

    fetchData();
  }, []);

  console.log(episode);
  console.log("state", state);

  //* コメントを取得する
  useEffect(() => {
    const fetchComment = async () => {
      const supabase = supabase_br;
      const { data, error } = await supabase
        .from("Comments")
        .select()
        .eq("episode_id", params.episode_id);
      if (error) return console.log(error);
      console.log(data);
      setComments(data);
    };

    fetchComment();

    if (state.message) {
      const timeout = setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.value = "";
          const element = document.documentElement;
          const bottom = element.scrollHeight - element.clientHeight;
          window.scrollTo({
            top: bottom,
            behavior: "smooth",
          });
        }
      }, 100);

      resize();
      return () => clearTimeout(timeout);
    }
  }, [state.message, isRevalidate]);

  // 送信したら最下部へスクロール
  useEffect(() => {
    const handleScroll = () => {
      const navibar = document.getElementById("navibar");

      if (navibar) {
        const navibarHeight = navibar.offsetHeight; // navibarの高さを取得
        const scrollPosition =
          window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition > navibarHeight) {
          setStickyBar(true);
        } else {
          setStickyBar(false);
        }
      }
    };

    // scroll イベントを追加
    window.addEventListener("scroll", handleScroll);

    // コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clickDeleteButton = (commentId: string) => {
    setOpenDeleteDialog(!openDeleteDialog);
    setDeleteId(commentId);
  };

  const clickReplyButton = (replyId: string) => {
    console.log("replId", replyId);
    console.log("replyTo", replyTo);

    if (replyId === replyTo) {
      setReplyTo("");
    } else {
      setReplyTo(replyId);
    }
  };

  const handleScrollToComment = (commentId: string) => {
    const element = document.getElementById(commentId.slice(0, 8));

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  console.log("revalidate", isRevalidate);

  return (
    <div>
      <div
        className={`sticky top-0 z-[1] flex justify-center ${
          stickyBar && "bg-gradient-to-b from-black/35 to-transparent"
        }`}
      >
        <div className="flex justify-between mx-2 w-full">
          <>
            <span className="cursor-pointer h-fit p-2 my-auto bg-slate-700/60 rounded-xl text-white">
              前のエピソード
            </span>
          </>
          <>
            <h1 className="my-4 text-lg">{episode.title}</h1>
          </>
          <>
            <span className="cursor-pointer h-fit p-2 my-auto bg-slate-700/60 rounded-xl text-white">
              前のエピソード
            </span>
          </>
        </div>
      </div>
      {/* <div>
          <p>リリース日 : {episode.released_on}</p>
          <>
            {episode.work && (
              <Link
                href={`https://twitter.com/${episode.work.twitter_username}`}
              >
                twitter
              </Link>
            )}
          </>
        </div> */}

      <div className="flex flex-col mx-auto sm:w-4/5 md:w-2/3 lg:w-1/2">
        <div className="mx-3 mb-[72px]">
          {comments.map((comment: any, index: number) => {
            const contentHeight = comment.content.split("\n").length;
            return (
              <div
                id={comment.id.slice(0, 8)}
                key={comment.id}
                className={`my-2 ${
                  index !== comments.length - 1 && "border-b-2"
                } ${replyTo === comment.id && "border-red-300"}`}
              >
                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center text-sm">
                      <div
                        className={`flex ${
                          replyTo === comment.id && "text-red-500/90"
                        }`}
                      >
                        {comment.reply_to && (
                          <p>ID: {comment.reply_to.slice(0, 8)} ⇐ &nbsp; </p>
                        )}
                        <p>ID: {comment.id.slice(0, 8)}</p>
                      </div>
                    </div>
                    <p>{comment.user}</p>
                  </div>
                  <div className="flex mb-2.5">
                    <p className="w-full ml-1 whitespace-pre-line">
                      {comment.content}
                    </p>
                    <div
                      className={`relative ${
                        contentHeight > 1 ? "w-6" : "w-20"
                      }`}
                    >
                      <>
                        <div
                          className={`absolute -bottom-1 right-0 flex gap-2 ${
                            contentHeight > 1 && "flex-col"
                          }`}
                        >
                          <div
                            className={`flex ${
                              contentHeight > 1 && "flex-col"
                            }`}
                          >
                            <button className="w-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="silver"
                                  d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
                                />
                              </svg>
                            </button>
                            <>
                              {contentHeight > 1 ? (
                                <div>
                                  <span className="text-sm">???</span>
                                </div>
                              ) : (
                                <div>
                                  <span className="text-[12px] ml-1 my-auto">
                                    ×
                                  </span>
                                  <span className="text-sm">?</span>
                                </div>
                              )}
                            </>
                          </div>
                          <>
                            {comment.user === "あなた" ? (
                              <button
                                onClick={() => clickDeleteButton(comment.id)}
                                className="w-5"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="brown"
                                    d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64c-35.3 0-64 28.7-64 64H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v56H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64c0 35.3 28.7 64 64 64v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h56v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448c35.3 0 64-28.7 64-64h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V176h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448c0-35.3-28.7-64-64-64V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H176V24zM160 128H352c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm192 32H160V352H352V160z"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={() => clickReplyButton(comment.id)}
                                className="w-5"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill={`${
                                      replyTo === comment.id //!
                                        ? "rgb(252, 105, 105)"
                                        : "gray"
                                    }`}
                                    d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"
                                  />
                                </svg>
                              </button>
                            )}
                          </>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mx-auto">
        <form
          action={action}
          className="fixed bottom-0 flex px-2 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 bg-slate-200 rounded-t-lg"
        >
          <textarea
            id="textarea"
            name="content"
            ref={textareaRef}
            onInput={() => resizeTextarea("textarea")}
            onKeyDown={pressKeyDown}
            placeholder="コメントする…"
            className="w-full border-b-2 border-red-300 mt-3 mb-2 resize-none focus:outline-none bg-slate-200"
          />
          <>
            <>
              {episode.work && (
                <input type="hidden" name="work_id" value={episode.work.id} />
              )}
            </>
            <input type="hidden" name="episode_id" value={episode.id} />
            <input type="hidden" name="reply_to" value={replyTo} />
          </>
          <>
            {replyTo && (
              <span
                onClick={() => handleScrollToComment(replyTo)}
                className="absolute w-fit h-3 right-2 text-[12px] cursor-pointer text-stone-900 hover:text-stone-500"
              >
                {replyTo.slice(0, 8)} に返信中…
              </span>
            )}
          </>
          <button
            id="submitButton"
            type="submit"
            className="w-6 mt-3 mx-3 py-auto transition-transform transform hover:translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="rgb(252 105 105)"
                d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
              />
            </svg>
          </button>
        </form>
      </div>
      <>
        {openDeleteDialog && (
          <DeleteDialog
            id={deleteId}
            isOpen={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            revalidate={() => setIsRevalidate(generateRandomNumber())}
          />
        )}
      </>
    </div>
  );
};

export default EpisodeComment;

const resize = () => {
  const $textarea = document.getElementById("textarea") as HTMLTextAreaElement;
  $textarea.style.height = "50px";
};
