
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticate, login, logout } from "~/session.server";

interface ILoaderData {
  is_login: boolean;
  username: string | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const username = await authenticate(request);

  if (username === false) {
    return json<ILoaderData>({ is_login: false, username: null });
  } else {
    return json<ILoaderData>({ is_login: true, username: username });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const id = body.get("id") as string;
  const password = body.get("password") as string;
  const action = body.get("action") as string;

  let cookie = "";

  if (action === "logout") {
    cookie = await logout(request);
  } else if (action === "login") {
    cookie = await login(request, id, password);
  }

  return redirect("/session", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};

export default function Session() {
  const data = useLoaderData<ILoaderData>();
  return (
    <div style={{ border: "3px solid red" }}>
      {JSON.stringify(data)}
      <h1>Hi I'm Session</h1>
      <Form method="post">
        <br />
        {data.is_login ? (
          <button type="submit" name="action" value="logout">
            로그아웃
          </button>
        ) : (
          <>
            <input type="text" name="id" placeholder="아이디" />
            <input type="text" name="password" placeholder="비밀번호" />
            <button type="submit" name="action" value="login">
              로그인
            </button>
          </>
        )}
      </Form>
    </div>
  );
}
