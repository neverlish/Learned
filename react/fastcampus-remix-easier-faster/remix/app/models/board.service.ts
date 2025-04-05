import supabase from "./supabase";

export type TBoard = {
  id: number;
  name: string | null;
};

export async function getBoards() {
  return await supabase.from("board").select(`id, name`);
}

export async function getBoard(id: number) {
  return await supabase.from("board").select(`id, name`).eq("id", id);
}

export async function createBoard(name: string) {
  return await supabase.from("board").insert({ name });
}

export async function updateBoard(id: number, name: string) {
  return await supabase.from("board").update({ name }).eq("id", id);
}

export async function deleteBoard(id: number) {
  return await supabase.from("board").delete().eq("id", id);
}