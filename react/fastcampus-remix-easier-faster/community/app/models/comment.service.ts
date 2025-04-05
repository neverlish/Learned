import supabase from "./supabase";

export async function getCommentById(id: number) {
  return await supabase.from("comment").select(`*`).eq("id", id).single();
} // 댓글 id 를 통해 댓글 불러오기

export async function createComment(
  post_id: number,
  writer: string,
  content: string
) {
  return await supabase.from("comment").insert({ post_id, writer, content });
} // 댓글 생성하기

export async function updateComment(id: number, content: string) {
  return await supabase.from("comment").update({ content }).eq("id", id);
} // 댓글 수정하기

export async function deleteComment(id: number) {
  return await supabase.from("comment").delete().eq("id", id);
} // 댓글 삭제하기