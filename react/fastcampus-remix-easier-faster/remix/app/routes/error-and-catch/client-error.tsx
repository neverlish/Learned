export default function ClientError() {
  throw new Error("에러 발생시키기");
}

export function ErrorBoundary({ error }: any) {
  return (
    <div>
      <h1>에러 발생</h1>
      <p>{error.message}</p>
      <p>스택 트레이스:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}