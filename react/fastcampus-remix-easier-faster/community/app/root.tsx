import { createEmotionCache, MantineProvider } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import { json, redirect, type LinksFunction, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import Header from "./components/Header";

import globalStyles from "./styles/global.css";
import { getUserToken } from "./auth.server";
import { User } from "@supabase/supabase-js";
import supabase from "./models/supabase";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyles },
];

export interface IRootDataLoader {
  is_login: boolean;
  user?: User | null;
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

createEmotionCache({ key: "mantine" });

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await getUserToken(request);

  if (!accessToken) return json<IRootDataLoader>({
    is_login: false,
  });

  const { data: { user } } = await supabase.auth.getUser(accessToken);

  return json<IRootDataLoader>({
    is_login: true,
    user,
  });
};


export default function App() {
  const { is_login, user } = useLoaderData<IRootDataLoader>();

  const location = useLocation();
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
          {!location.pathname.includes("/auth") && (
            <Header is_login={is_login} />
          )}
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
