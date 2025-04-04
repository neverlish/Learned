import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createUserSession } from "~/auth.server";
import { getTokens } from "~/models/auth.service";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const id = body.get("id") as string;
  const password = body.get("password") as string;
  const tokens = await getTokens({ id, password });
  return await createUserSession({
    request,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    redirectTo: "/auth/verify",
  });
};

export default function Login() {
  const tokens = useActionData();
  return (
    <div style={{ border: "3px solid red" }}>
      <h1>Login</h1>
      <Form method="post">
        <input type="text" name="id" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </Form>
      {JSON.stringify(tokens)}
    </div>
  );
}