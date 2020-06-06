import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Router } from "https://deno.land/x/oak/mod.ts";
import { Book } from "./types.ts";

const router = new Router();

let books: Book[] = [
  {
    id: "1",
    title: "Book One",
    author: "One",
  },
  {
    id: "2",
    title: "Book Two",
    author: "Two",
  },
  {
    id: "3",
    title: "Book Three",
    author: "Three",
  },
];

router
  .get("/", (context) => {
    context.response.body = "Hello world, Hi!";
  })
  .get("/books", (context) => {
    context.response.body = books;
  })
  .post("/book", async (context) => {
    const body = await context.request.body();

    if (!context.request.hasBody) {
      context.response.status = 400;
      context.response.body = "데이터가 없습니다";
    } else {
      const book: Book = body.value;
      book.id = v4.generate();
      books.push(book);
      context.response.status = 201;
      context.response.body = book;
    }
  })
  .get("/book/:id", async (context) => {
    const book: Book | undefined = books.find((b) =>
      b.id === context.params.id
    );
    if (book) {
      context.response.body = book;
      context.response.status = 200;
    } else {
      context.response.body = "책을 찾지 못했습니다.";
      context.response.status = 404;
    }
  });

export default router;
