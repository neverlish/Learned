import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ThrownResponse } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { useCatch } from "@remix-run/react";

interface IError {
  message: string;
}

export const action: ActionFunction = async () => {
  throw json<IError>({ message: "그냥 띄워본 에러" }, { status: 500 });
};

export default function ActionError() {
  return (
    <div style={{ border: "3px solid blue" }}>
      <Form method="post">
        <button type="submit">액션에 전송</button>
      </Form>
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
