import { HeadersFunction, LinksFunction, MetaFunction } from "@remix-run/node";

import Stylesheet from "~/styles/test.css";

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "/favicon.ico", type: "image/png" },

    {
      rel: "stylesheet",
      href: "https://example-css-six.vercel.app/example.css",
    },

    {
      rel: "stylesheet",
      href: Stylesheet
    },

    {
      rel: "prefetch",
      as: "image",
      href: "/img/bunny.jpg",
    },
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  "og:title": "OG TITLE 입니다",
  "og:description": "OG DESCRIPTION 입니다",
  title: "나는 제목입니다.",

  description: "나는 설명입니다.",
  viewport: "width=device-width, initial-scale=1",

  refresh: {
    httpEquiv: "refresh",
    content: "test",
  }
})

export const headers: HeadersFunction = ({
  actionHeaders,
  loaderHeaders,
  parentHeaders,
}) => ({
  "Cache-Control": "max-age=369, s-maxage=3636",
})

export default function Index() {
  return (
    <div>
      <h1>Index</h1>
      <p>Some content</p>
      <input type="text" />
      안녕하세요
    </div>
  );
}