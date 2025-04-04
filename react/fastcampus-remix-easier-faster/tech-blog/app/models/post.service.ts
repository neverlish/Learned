import type { TComment } from "./comment.service";
import supabase from "./supabase";

export type TPost = {
  id: number;
  title: string | null;
  content: string | null;
  created_at: string | null;
  comment: TComment | TComment[] | null | { count: number }[];
};

export async function getPosts() {
  return await supabase
    .from("post")
    .select(`id, title, content, created_at, comment(count)`)
    .order("created_at", { ascending: false });
}

export async function getPost(id: number) {
  return await supabase
    .from("post")
    .select(`id, title, content, created_at, comment(*)`)
    .eq("id", id)
    .limit(1)
    .single();
}

export async function createPost(title: string, content: string) {
  return await supabase.from("post").insert({ title, content });
}

export async function updatePost(id: number, title: string, content: string) {
  return await supabase.from("post").update({ title, content }).eq("id", id);
}

export async function deletePost(id: number) {
  return await supabase.from("post").delete().eq("id", id);
}