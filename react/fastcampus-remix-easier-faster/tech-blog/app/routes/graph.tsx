import { BarGraph } from "~/components/bar-graph.client";
import { ClientOnly } from "remix-utils";

export default function Graph() {
  return (
    <div style={{ border: "3px solid red" }}>
      <h1>Nested</h1>
      <ClientOnly fallback={<></>}>{() => <BarGraph />}</ClientOnly>
    </div>
  );
}