import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { refreshAccessToken } from "./models/auth.service";

class AuthorizationError extends Error {}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secrets: ["secret"],
    },
  });

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

export async function authenticate(
  request: Request,
  headers = new Headers()
): Promise<{ accessToken: string; headers?: Headers }> {
  try {
    const { accessToken } = await getUserToken(request);

    if (!accessToken) throw redirect("/auth/login");

    const session = await getSession(request.headers.get("Cookie"));

    if (new Date(session.get("expirationDate") * 1000) < new Date()) {
      throw new AuthorizationError("Expired");
    }

    return { accessToken };
  } catch (error) {
    if (error instanceof AuthorizationError) {
      //   throw await logout(request);
      const { refreshToken } = await getUserToken(request);

      if (new Date(getExpireDate(refreshToken) * 1000) < new Date()) {
        throw await logout(request);
      }

      const newTokens = await refreshAccessToken({ refreshToken });

      if (newTokens.statusCode === 403) {
        throw await logout(request);
      }

      const session = await getSession(request.headers.get("Cookie"));

      session.set("accessToken", newTokens.access_token);
      session.set("refreshToken", refreshToken);
      session.set(
        "expirationDate",
        JSON.parse(atob(newTokens.access_token.split(".")[1])).exp
      );

      headers.append(
        "Set-Cookie",
        await commitSession(session, {
          maxAge: 7 * 24 * 60 * 60 * 1,
        })
      );

      if (request.method === "GET") throw redirect(request.url, { headers });

      return { accessToken: newTokens.access_token, headers };
    }

    throw error;
  }
}

export const getExpireDate = (jwt: string): number =>
  parseInt(JSON.parse(atob(jwt.split(".")[1])).exp);

export async function createUserSession({
  request,
  access_token,
  refresh_token,
  redirectTo,
}: {
  request: Request;
  access_token: string;
  refresh_token: string;
  redirectTo: string;
}) {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("accessToken", access_token);
  session.set("refreshToken", refresh_token);
  session.set("expirationDate", getExpireDate(access_token));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session, {
        maxAge: 7 * 24 * 60 * 60 * 1, // 1 week
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}