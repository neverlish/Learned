import { Outlet, Link } from "@remix-run/react";

export default function ErrorAndCatch() {
  return (
    <div style={{ border: "3px solid red" }}>
      <h1>Test Error and Catch Boundary</h1>
      <Link to="/error-and-catch/loader-error">로더 에러</Link>{" "}
      <Link to="/error-and-catch/action-error">액션 에러</Link>{" "}
      <Link to="/error-and-catch/client-error">클라이언트 에러</Link>
      <Outlet />
    </div>
  );
}