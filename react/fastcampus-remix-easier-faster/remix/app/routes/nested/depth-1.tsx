import { Outlet } from "@remix-run/react";
import { useState } from "react";

export default function Depth1() {
  const [value, setValue] = useState("hello");

  return (
    <div style={{ border: "3px solid green" }}>
      <h1>Depth 1</h1>
      <Outlet context={{ value }} />
    </div>
  );
}
