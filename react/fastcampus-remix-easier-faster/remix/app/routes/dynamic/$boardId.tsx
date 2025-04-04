import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";

type LoaderData = {
  status: number;
  message: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const boardId = params.boardId ?? "NO ID";

  console.log("게시판 ID:", boardId);

  return json<LoaderData>({
    status: 200,
    message: boardId,
  });
};

export default function BoardId() {
  const params = useParams();
  const boardId = params.boardId;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("location", location);
  }, [location]);

  return (
    <div style={{ border: "3px solid green" }}>
      <h1>게시판 ID: {boardId}</h1>
      {boardId === "1" && (
        <>
          <Link to="/dynamic/1/1">글 1</Link>{" "}
          <Link to="/dynamic/1/2">글 2</Link>{" "}
          <button
            onClick={() => {
              navigate("/dynamic/1/3");
            }}
          >
            글 3
          </button>
        </>
      )}
      <Outlet />
    </div>
  );
}