import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Outlet,
  useCatch,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import type { TPost } from "~/models/post.service";
import { deletePost } from "~/models/post.service";
import { updatePost } from "~/models/post.service";
import { getPost } from "~/models/post.service";
import qs from "qs";

type LoaderData = {
  post: TPost | null;
  statusCode?: number;
};

enum InputType {
  UPDATE_POST = "0",
  DELETE_POST = "1",
}

type InputData = {
  action: InputType;
  id?: number;
  title?: string;
  content?: string;
};

type ActionData = {
  message: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? "NO BOARD ID";
  const postId = params.postId ?? "NO POST ID";

  if (postId === "NO POST ID") {
    throw json<LoaderData>({
      post: null,
    });
  }

  const post = await getPost(parseInt(postId));

  return json<LoaderData>({
    post: post.data || null,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? "NO BOARD ID";
  const data = qs.parse(await request.text()) as unknown as InputData;

  console.log(data);
  switch (data.action) {
    case InputType.UPDATE_POST: {
      if (data.id && data.title && data.content) {
        const post = await updatePost(
          data.id,
          data.title,
          data.content,
          parseInt(boardId)
        );
        console.log(post);
        return json<ActionData>({ message: "글이 수정되었습니다." });
      }
    }
    case InputType.DELETE_POST: {
      if (data.id) {
        const post = await deletePost(data.id);
        console.log(post);
        return redirect(`/dynamic/${boardId}`);
      }
    }
  }
  return json<ActionData>({ message: "" });
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

  const [mode, setMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    setPost(loaderData.post);
  }, [loaderData.post]);

  return (
    <div style={{ border: "3px solid blue" }}>
      <h1>게시판 ID: {boardId}</h1>
      <h1>게시글 ID: {postId}</h1>
      <Form method="post">
        <button type="submit" name="action" value={InputType.DELETE_POST}>
          삭제
        </button>
        <input type="hidden" name="id" value={post?.id} />
      </Form>
      <button
        onClick={() => {
          if (mode === "view") {
            setMode("edit");
          } else {
            setMode("view");
          }
        }}
      >
        {mode === "view" ? "수정" : "취소"}
      </button>
      {mode === "edit" ? (
        <Form
          method="post"
          onSubmit={() => {
            setMode("view");
          }}
        >
          <input type="hidden" name="id" value={post?.id} />
          <input
            type="text"
            name="title"
            defaultValue={post?.title?.toString()}
          />
          <br />
          <textarea name="content" defaultValue={post?.content?.toString()} />
          <br />
          <button type="submit" name="action" value={InputType.UPDATE_POST}>
            수정
          </button>
        </Form>
      ) : (
        <>
          <h1>{post?.title}</h1>
          <h5>{post?.content}</h5>
        </>
      )}

      <Outlet />
    </div>
  );
}