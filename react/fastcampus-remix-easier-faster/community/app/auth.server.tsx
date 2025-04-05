import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { User } from "@supabase/supabase-js";
import supabase from "./models/supabase";

class AuthorizationError extends Error {}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secrets: ["secret"], // Production 에서는 secrets 도 설정해야하고, secure 옵션도 켜주는 것이 좋다.
    },
  });

  export async function createUserSession({
    request,
    access_token,
    refresh_token,
    expires_at,
    user,
    redirectTo,
  }: {
    request: Request;
    access_token: string;
    refresh_token: string;
    expires_at: number;
    user: User;
    redirectTo: string;
  }) {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("accessToken", access_token);
    session.set("refreshToken", refresh_token);
    session.set("user", user);
    session.set("expires_at", expires_at);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await commitSession(session, {
          maxAge: 7 * 24 * 60 * 60 * 1, // 1 week
        }),
      },
    });
  }

export async function getUserToken(request: Request): Promise<{
  accessToken: string;
  refreshToken: string;
  expirationDate: number;
}> {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const refreshToken = session.get("refreshToken");
  const expirationDate = session.get("expirationDate");
  return { accessToken, refreshToken, expirationDate };
}

export async function getUser(request: Request): Promise<{
  user: User;
}> {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  return { user };
}  

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export async function authenticate(
  request: Request,
  headers = new Headers()
): Promise<{ accessToken: string; headers?: Headers }> {
  try {
    const { accessToken } = await getUserToken(request);

    if (!accessToken) throw redirect("/auth/sign-in");

    const session = await getSession(request.headers.get("Cookie"));

    if (new Date(session.get("expires_at") * 1000) < new Date()) {
      throw new AuthorizationError("Expired");
    }

    return { accessToken };
  } catch (error) { // 토큰 재발급 로직
    if (error instanceof AuthorizationError) {
      const { refreshToken } = await getUserToken(request);
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error || !data.session) throw await logout(request);

      const session = await getSession(request.headers.get("Cookie"));

      session.set("accessToken", data.session.access_token);
      session.set("refreshToken", data.session.refresh_token);
      session.set("expires_at", data.session.expires_at);

      headers.append(
        "Set-Cookie",
        await commitSession(session, {
          maxAge: 7 * 24 * 60 * 60 * 1,
        })
      );

      if (request.method === "GET") throw redirect(request.url, { headers });

      return { accessToken: data.session.access_token, headers };
    }

    throw error;
  }
}