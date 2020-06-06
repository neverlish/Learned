import { serve } from "https://deno.land/std/http/server.ts";

const s = serve({ port: 5000 });
console.log("http://localhost:5000");

for await (const req of s) {
  req.respond({ body: "Hello, Thank you\n" });
}
