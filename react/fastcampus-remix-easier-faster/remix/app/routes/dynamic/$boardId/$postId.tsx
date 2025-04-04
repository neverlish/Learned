import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { TPost } from "~/models/post.service";
import { getPost } from "~/models/post.service";

type LoaderData = {
  post: TPost | null;
  statusCode?: number;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? "NO BOARD ID";
  const postId = params.postId ?? "NO POST ID";

  if (postId === "NO POST ID") {
    throw json<LoaderData>({
      post: null,
    });
  }

  if (postId === "2") {
    throw json<LoaderData>(
      {
        post: null,
      },
      { status: 400 }
    );
  }

  const post = await getPost(parseInt(postId));

  return json<LoaderData>({
    post: post.data || null,
  });
};

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div style={{ border: "3px solid blue" }}>
      {caught.status === 400 && <h1>400 에러가 발생했습니다.</h1>}
    </div>
  );
}

export default function PostId() {
  const params = useParams();
  const boardId = params.boardId;
  const postId = params.postId;

  const loaderData = useLoaderData<LoaderData>();
  const [post, setPost] = useState<TPost | null>(loaderData.post);

  useEffect(() => {
    setPost(loaderData.post);
  }, [loaderData.post]);

  return (
    <div style={{ border: "3px solid blue" }}>
      <h1>게시판 ID: {boardId}</h1>
      <h1>게시글 ID: {postId}</h1>
      <h1>{post?.title}</h1>
      <h5>{post?.content}</h5>
      <Outlet />
    </div>
  );
}