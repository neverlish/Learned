
import { Outlet } from "@remix-run/react";

export default function NestedDepth1Depth2End() {
  return (
    <div style={{ border: "3px solid green" }}>
      <h1>Nested Route only path</h1>
      <Outlet />
    </div>
  );
}
