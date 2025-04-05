import supabase from "./supabase";

export type TBoard = {
  id: number;
  name: string;
  path: string;
  created_at: string | null;
};

export async function getBoards() {
  return await supabase.from("board").select(`id, name, path, created_at`);
} // 게시판 모두 불러오기

export async function getBoardByPath(path: string) {
  return await supabase
    .from("board")
    .select(`id, name, path, created_at`)
    .eq("path", path)
    .single();
} // 특정 path 를 가진 게시판 불러오기