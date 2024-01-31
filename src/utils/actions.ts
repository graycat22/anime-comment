"use server";

import { generateRandomNumber } from "./functions-cs";
import { supabase_sb } from "./supabase-ss";

type CommentType = { message: string };

export const postComment = async (
  currentState: CommentType,
  formData: FormData
): Promise<CommentType> => {
  const content = formData.get("content");
  const workId = formData.get("work_id");
  const episodeId = formData.get("episode_id");
  const replyTo = formData.get("reply_to");

  if (!content) {
    console.log("しっぱい");
    return { message: "failed" };
  }

  const supabase = await supabase_sb();
  const { error } = await supabase.from("Comments").insert({
    user: "dehanai",
    content: content,
    summary: "",
    work_id: workId,
    episode_id: episodeId,
    reply_to: replyTo,
  });
  if (error) {
    throw new Error("Content is missing");
  } else {
    return { message: `success${generateRandomNumber()}` };
  }
};
