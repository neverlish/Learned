interface IAuth {
  id: string;
  password: string;
}

type TToken = string;

export const AuthServiceFetchWrapper = async (
  method: "POST" | "GET" | "PUT" | "DELETE" = "POST",
  path: string,
  body?: any,
  token?: TToken
) =>
  await fetch(`https://fc-jwt-generator.vercel.app${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      token: token ?? "",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return { error: err };
    });

export const getTokens = async ({ id, password }: IAuth) => {
  return await AuthServiceFetchWrapper("POST", "/auth/access", {
    id,
    password,
  });
};

export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: TToken;
}) => {
  return await AuthServiceFetchWrapper("POST", "/auth/refresh", {
    refreshToken,
  });
};

export const verifyToken = async ({ token }: { token: TToken }) => {
  return await AuthServiceFetchWrapper("GET", "/auth/verify", undefined, token);
};