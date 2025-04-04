import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useParams } from "@remix-run/react";

type LoaderData = {
  status: number;
  message: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? "NO BOARD ID";
  const postId = params.postId ?? "NO POST ID";

  console.log("게시판 ID:", boardId);
  console.log("게시글 ID:", postId);

  return json<LoaderData>({
    status: 200,
    message: postId,
  });
};

export default function PostId() {
  const params = useParams();
  const boardId = params.boardId;
  const postId = params.postId;
  return (
    <div style={{ border: "3px solid blue" }}>
      <h1>게시판 ID: {boardId}</h1>
      <h1>게시글 ID: {postId}</h1>
      <Outlet />
    </div>
  );
}
