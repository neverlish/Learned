import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ThrownResponse } from "@remix-run/react";
import { useCatch } from "@remix-run/react";

interface IError {
  message: string;
}

export const loader: LoaderFunction = async () => {
  throw json<IError>({ message: "그냥 띄워본 에러" }, { status: 500 });
};

export default function LoaderError() {
  return (
    <div style={{ border: "3px solid blue" }}>
      <h1>LoaderError</h1>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, IError>>();

  return (
    <div>
      <p>HTTP Status: {caught.status}</p>
      <p>에러 메시지: {caught.data.message}</p>
    </div>
  );
}