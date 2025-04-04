import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { TBoard } from "~/models/board.service";
import { getBoards } from "~/models/board.service";

interface ILoaderData {
  boards: TBoard[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const boards = await getBoards();
  return json<ILoaderData>({ boards: boards.data || [] });
};

export default function Dynamic() {
  const loaderData = useLoaderData<ILoaderData>();
  const [boards] = useState<TBoard[]>(loaderData.boards);

  return (
    <div style={{ border: "3px solid red" }}>
      <h1>Dynamic</h1>
      {boards.map((board) => (
        <>
          <Link to={`/dynamic/${board.id}`} prefetch="intent">
            {board.name}
          </Link>{" "}
        </>
      ))}
      <Outlet />
    </div>
  );
}