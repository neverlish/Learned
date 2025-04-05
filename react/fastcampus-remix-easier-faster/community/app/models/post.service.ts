import supabase from "./supabase";

export type TPost = {
  id: number;
  title: string | null;
  path: string | null;
  created_at: string;
  writer: {
    name: string;
    user_id: string;
  };
  board: {
    name: string;
    path: string;
  };
}

export async function getPosts() {
  return await supabase
    .from("post")
    .select(
      `id, title, content, writer(name), view, created_at, board(name, path)`
    )
    .order("created_at", { ascending: false });
} // 모든 게시글을 최신순으로 정렬하여 불러오기

export async function getPostByBoardId(board_id: number) {
  return await supabase
    .from("post")
    .select(`*, writer(name)`)
    .eq("board_id", board_id)
    .order("created_at", { ascending: false });
} // 특정 게시판의 게시글을 최신순으로 정렬하여 불러오기

export async function getPostById(id: number) {
  return await supabase
    .from("post")
    .select(`*, writer(name, user_id), comment(*, writer(name, user_id))`)
    .order("created_at", { foreignTable: "comment", ascending: true })
    .eq("id", id)
    .single();
} // 게시글 id 를 통해 댓글을 최신순으로 정렬하면서 게시글 불러오기

export async function updateViewById(id: number) {
  return await supabase.rpc("post_view_increment", { x: 1, row_id: id });
} // 미리 정의해둔 post_view_increment 함수를 RPC 로 실행시키기
// 해당 함수는 특정 게시글에 있는 view 필드를 1 만큼 더하는 함수
// row_id 는 게시글 id, x 는 더하는 수를 의미함

export async function createPost(
  title: string,
  content: string,
  board_id: number,
  writer: string
) {
  return await supabase
    .from("post")
    .insert({ title, content, board_id, writer });
} // 게시글 생성하기

export async function updatePost(id: number, title: string, content: string) {
  return await supabase.from("post").update({ title, content }).eq("id", id);
} // 게시글 수정하기

export async function deletePost(id: number) {
  return await supabase.from("post").delete().eq("id", id);
} // 게시글 삭제하기