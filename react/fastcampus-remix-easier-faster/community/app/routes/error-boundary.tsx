import type { LoaderFunction } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  throw new Error("이것은 로더에서 발생한 에러입니다.");
  //   throw new Response("이것은 로더에서 발생한 에러입니다.", { status: 500 });
  return {};
};

export function ErrorBoundary() {
  const error = useRouteError(); // 다음 Hook 을 통해 에러 불러오기

  // isRouteErrorResponse 가 true 면 CatchBoundary 와 동일하게 작동됨
  // Loader, Action 에서 발생한 4xx/5xx 에러
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = "Unknown error"; // 에러 메시지 정의
  if (error instanceof Error) {
    // 만약 error 객체가 Error 타입인 경우 메시지 값으로 변경
    // error 객체가 Error 타입이 아닐 수 있음. 문자열 값으로 나올 수 있음.
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}

export default function ErrorPage() {
  //   {
  //     throw new Error("test");
  //   }
  return <></>;
}