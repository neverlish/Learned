import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

type LoaderData = {
  status: number;
  message: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log("해당 console.log 는 터미널 (Remix Server) 에서만 나옵니다.")

  const cookie = request.headers.get("Cookie");

  // URL Query `?query=` 로 들어온 값을 가져오는 방법
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  console.log("Cookie", cookie)
  console.log("URL", url);
  console.log("Query", query);


  // const body = JSON.stringify({
  //   status: 200,
  //   message: "Hello World",
  // });

  // return new Response(body, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // => 위와 동일한 코드
  return json<LoaderData>({
    status: 200,
    message: "Hello World",
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  console.log("Action 실행됨")
  const body = await request.formData();
  const name = body.get("name");
  console.log(name);
  return redirect(`/loader-and-action`);
};

export default function LoaderAndAction() {
  const initalData = useLoaderData<LoaderData>();

  return (
    <div>
      {
        JSON.stringify(initalData)
      }

      <Form method="post">
        <input type="text" name="name" />
        <button type="submit">전송</button>
      </Form>
    </div>
  );
}