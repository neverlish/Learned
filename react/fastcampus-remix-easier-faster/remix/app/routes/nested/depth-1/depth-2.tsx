import { Outlet, useOutletContext } from "@remix-run/react";

export default function Depth2() {
  const { value } = useOutletContext<{ value: string }>();
  return (
    <div style={{ border: "3px solid blue" }}>
      <h1>Depth 2</h1>
      {value}
      <Outlet />
    </div>
  );
}