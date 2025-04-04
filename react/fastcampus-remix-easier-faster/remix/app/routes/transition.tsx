import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";

interface ILoaderData {
  message: string;
}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const test = body.get("test") as string;
  await new Promise((r) => setTimeout(r, 3000));
  return json<ILoaderData>({ message: test });
};

export default function Transition() {
  const transition = useTransition();
  const data = useActionData<ILoaderData>();

  return (
    <div style={{ border: "3px solid red" }}>
      <h1>Hi I'm Transition</h1>
      {JSON.stringify(data, null, 2)}
      <Form method="post">
        <div>{JSON.stringify(transition, null, 2)}</div>
        <input type="text" name="test" />
        <button type="submit">전송</button>
      </Form>
      <Form method="post">
        <div>{JSON.stringify(transition, null, 2)}</div>
        <input type="text" name="test" />
        <button type="submit">전송</button>
      </Form>
    </div>
  );
}