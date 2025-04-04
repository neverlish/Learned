import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createCookie } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

interface ILoaderData {
  message: string;
}

export const testCookie = createCookie("message", {
  maxAge: 30, // 30초
  secrets: ["secret"],
});

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await testCookie.parse(cookieHeader)) || {};
  return json<ILoaderData>({ message: cookie.message });
};

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await testCookie.parse(cookieHeader)) || {};

  const body = await request.formData();
  const message = body.get("message") as string;

  cookie.message = message;

  return redirect("/cookie", {
    headers: {
      "Set-Cookie": await testCookie.serialize(cookie),
    },
  });
};

export default function Cookie() {
  const data = useLoaderData<ILoaderData>();
  return (
    <div style={{ border: "3px solid red" }}>
      <h1>Hi I'm Cookie</h1>
      <Form method="post">
        <input type="text" name="message" defaultValue={data.message} />
        <button type="submit">전송</button>
      </Form>
    </div>
  );
}
