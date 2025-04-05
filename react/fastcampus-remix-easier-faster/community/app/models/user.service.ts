import supabase from "./supabase";

export async function createUser(user_id: string, name: string) {
  return await supabase.from("user").insert({ user_id, name });
} // 유저 생성하기

export async function getUserByUserId(user_id: string) {
  return await supabase
    .from("user")
    .select("*")
    .eq("user_id", user_id)
    .single();
} // 유저 id 를 통해 유저 불러오기

export async function updatePointByUserId(user_id: string, point: number) {
  return await supabase.rpc("user_point_increment", {
    x: point,
    row_id: user_id,
  }); // 미리 정의해둔 user_point_increment 함수를 RPC 로 실행시키기
// 해당 함수는 특정 유저에게 point 만큼 포인트를 더해줌
// row_id 는 유저 id, x 는 더하는 수를 의미함
}