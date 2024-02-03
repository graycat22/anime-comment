"use server";

import { generateRandomNumber } from "./functions-cs";
import { supabase_sa } from "./supabase-ss";

type CommentType = { message: string };

//* コメント投稿 ////////////////////////////////////////////////
export const postComment = async (
  currentState: CommentType,
  formData: FormData
): Promise<CommentType> => {
  const content = formData.get("content");
  const workId = formData.get("work_id");
  const episodeId = formData.get("episode_id");
  const replyTo = formData.get("reply_to");

  console.log("content", Boolean(content));

  if (!content || content.toString().trim() === "") {
    console.log("しっぱい");
    return { message: `failed${generateRandomNumber()}` };
  }

  const supabase = await supabase_sa();
  const { error } = await supabase.from("Comments").insert({
    user: "あなた",
    content: content.toString().trim(),
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

//* コメント削除 ////////////////////////////////////////////////
export const deleteComment = async (commenId: string) => {
  console.log("commenetId", commenId);
  const supabase = await supabase_sa();
  const { error } = await supabase.from("Comments").delete().eq("id", commenId);
  if (error) {
    return console.log("コメント削除に失敗しました");
  } else {
    console.log("削除に成功しました");
  }
};

//* セッションの有無でログイン状態かどうかを判定 /////////////////////////
export const ListenToAuth = async () => {
  const supabase = await supabase_sa();
  const authListener = supabase.auth.onAuthStateChange((event, session) => {
    console.log("event", event);
    if (event === "SIGNED_IN") {
      console.log("ログインしました");
    }
    if (event === "SIGNED_OUT") {
      console.log("ログアウトしました");
    }
  });

  return () => {
    authListener.data.subscription.unsubscribe(); //* Unsubscribe when component unmounts
  };
};

//* signUp か logIn を振り分ける。
export const setupAccount = async (
  query: "login" | "signup",
  currentState: CommentType,
  formData: FormData
): Promise<CommentType> => {
  console.log("saa", query, formData.get("email")?.toString());
  if (query === "login") {
    return logIn(currentState, formData);
  } else if (query === "signup") {
    return signUp(currentState, formData);
  } else {
    return { message: "failed!!" };
  }
};

//* メアドでサインアップ ////////////////////////////////////////////////
export const signUp = async (
  currentState: CommentType,
  formData: FormData
): Promise<CommentType> => {
  const displayName = formData.get("display_name");
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!displayName || !displayName.toString().trim()) {
    return { message: "ディスプレイ名は必須です" };
  }

  if (!email || !email.toString().trim()) {
    return { message: "メールアドレスは必須です" };
  }

  if (!password || !password.toString().trim()) {
    return { message: "パスワードは必須です" };
  }

  const supabase = await supabase_sa();
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) {
    return { message: `failed` };
  } else {
    return { message: `success` };
  }
};

//* メアドでログイン ////////////////////////////////////////////////
export const logIn = async (
  currentState: CommentType,
  formData: FormData
): Promise<CommentType> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !email.toString().trim()) {
    return { message: "メールアドレスは必須です" };
  }

  if (!password || !password.toString().trim()) {
    return { message: "パスワードは必須です" };
  }

  const supabase = await supabase_sa();
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return { message: `failed` };
  } else {
    return { message: `success` };
  }
};

//* ログアウト ////////////////////////////////////////////////
// export const signOut = async () => {
//   const supabase = await supabase_sa();
//   const { error } = await supabase.auth.signOut();
//   if (error) console.log("ログアウトできませんでした");
// };

//* ユーザー情報の変更 ////////////////////////////////////////////////
export const updateUser = async (formData: FormData) => {
  const displayName = formData.get("display_name");
  const apiKey = formData.get("api_key")?.toString();

  const supabase = await supabase_sa();
  const { error } = await supabase.auth.updateUser({
    data: { display_name: displayName, api_key: apiKey },
  });

  if (error) {
    return { message: `failed` };
  } else {
    return { message: `success` };
  }
};

//* API キーを削除 ////////////////////////////////////////////////
export const deleteApiKey = async () => {
  const supabase = await supabase_sa();
  const { error } = await supabase.auth.updateUser({
    data: { api_key: null },
  });

  if (error) {
    return { message: `failed` };
  } else {
    return { message: `success` };
  }
};
