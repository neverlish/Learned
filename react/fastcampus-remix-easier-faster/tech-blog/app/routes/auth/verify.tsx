import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { authenticate, logout } from "~/auth.server";
import { verifyToken } from "~/models/auth.service";

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await authenticate(request);
  const verify = await verifyToken({ token: accessToken });
  return verify;
};

export const action: ActionFunction = async ({ request }) => {
  const { accessToken, headers } = await authenticate(request);
  const verify = await verifyToken({ token: accessToken });

  if ((await request.formData()).get("action") === "logout") {
    return await logout(request);
  }

  return json(verify, { headers });
};

export default function Verify() {
  const fetcher = useFetcher();

  const initialVerify = useLoaderData();
  const authInfo = fetcher.data || initialVerify;

  return (
    <div style={{ border: "3px solid red" }}>
      <h1>You Are Logged In. Hi {authInfo.id}</h1>
      <p>{JSON.stringify(authInfo)}</p>
      <p>토큰 만료일: {new Date(authInfo.exp * 1000).toLocaleString()}</p>
      <p>현재 시각: {new Date().toLocaleString()}</p>
      <fetcher.Form method="post">
        <button type="submit">갱신</button>
      </fetcher.Form>
      <fetcher.Form method="post">
        <button type="submit" name="action" value="logout">
          로그아웃
        </button>
      </fetcher.Form>
    </div>
  );
}
