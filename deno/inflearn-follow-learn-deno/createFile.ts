const encoder = new TextEncoder();

const helloText = encoder.encode("hello, thank you");

await Deno.writeFile("hello.txt", helloText);
