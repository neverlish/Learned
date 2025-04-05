import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import type { TPostTitleOnly } from "~/models/post.service";
import { createPost } from "~/models/post.service";
import { getPostsTitleByBoardId } from "~/models/post.service";

type LoaderData = {
  posts: TPostTitleOnly[];
};

type ActionData = {
  message: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? "NO ID";

  if (boardId === "NO ID") {
    return json<LoaderData>({
      posts: [],
    });
  }

  const posts = await getPostsTitleByBoardId(parseInt(boardId));
  
  return json<LoaderData>({
    posts: posts.data || [],
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? "NO ID";

  const body = await request.formData();
  const title = body.get("title");
  const content = body.get("content");

  console.log(title, content);

  if (title && content && boardId !== "NO ID") {
    const post = await createPost(
      title.toString(),
      content.toString(),
      parseInt(boardId)
    );
    console.log(post);
    return json<ActionData>({ message: "글이 등록되었습니다." });
  }

  return json<ActionData>({ message: "" });
};

export default function BoardId() {
  const params = useParams();
  const boardId = params.boardId;

  const location = useLocation();
  const navigate = useNavigate();

  const loaderData = useLoaderData<LoaderData>();
  const [posts, setPosts] = useState<TPostTitleOnly[]>(loaderData.posts);

  const actionData = useActionData<ActionData>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setPosts(loaderData.posts);
  }, [loaderData.posts]);

  useEffect(() => {
    console.log("actionData", actionData);
    if (actionData) {
      setMessage(actionData.message);
    }
  }, [actionData]);

  useEffect(() => {
    console.log("location", location);
  }, [location]);

  return (
    <div style={{ border: "3px solid green" }}>
      <h1>게시판 ID: {boardId}</h1>
      {message && <div>{message}</div>}
      <Form method="post">
        <input type="text" name="title" placeholder="제목" />
        <br />
        <textarea name="content" placeholder="내용" />
        <br />
        <button type="submit">등록</button>
      </Form>
      {posts.map((post) => (
        <>
          <Link to={`/dynamic/${boardId}/${post.id}`} prefetch="intent">
            {post.title}
          </Link>{" "}
        </>
      ))}
      <Outlet />
    </div>
  );
}