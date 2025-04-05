import { useFetcher } from "@remix-run/react";

export default function Todo() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <div>{JSON.stringify(fetcher, null, 2)}</div>
      <input type="text" name="test" />
      <button type="submit">전송</button>
    </fetcher.Form>
  );
}