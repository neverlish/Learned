import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import type { TPostTitleOnly } from "~/models/post.service";
import { getPostsTitleByBoardId } from "~/models/post.service";

type LoaderData = {
  posts: TPostTitleOnly[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? "NO ID";

  if (boardId === "NO ID") {
    return json<LoaderData>({
      posts: [],
    });
  }

  const posts = await getPostsTitleByBoardId(parseInt(boardId));

  console.log(posts);
  return json<LoaderData>({
    posts: posts.data || [],
  });
};

export default function BoardId() {
  const params = useParams();
  const boardId = params.boardId;

  const location = useLocation();
  const navigate = useNavigate();

  const loaderData = useLoaderData<LoaderData>();
  const [posts, setPosts] = useState<TPostTitleOnly[]>(loaderData.posts);

  useEffect(() => {
    setPosts(loaderData.posts);
  }, [loaderData.posts]);

  useEffect(() => {
    console.log("location", location);
  }, [location]);

  return (
    <div style={{ border: "3px solid green" }}>
      <h1>게시판 ID: {boardId}</h1>
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