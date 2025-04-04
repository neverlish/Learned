import { Outlet } from "@remix-run/react";

export default function Nested() {
  return (
    <div style={{ border: "3px solid red" }}>
      <h1>Nested</h1>
      <Outlet />
    </div>
  );
}