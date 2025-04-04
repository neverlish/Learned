import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 10,
      path: "/",
      sameSite: "lax",
      secrets: ["secret"],
    },
  });

export async function authenticate(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("username")) {
    return session.get("username");
  } else {
    return false;
  }
}

export async function login(request: Request, id: string, password: string) {
  const session = await getSession(request.headers.get("Cookie"));

  if (id === "admin" && password === "admin") {
    session.set("username", "admin");
    return await commitSession(session);
  } else {
    return await destroySession(session);
  }
}

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return await destroySession(session);
}