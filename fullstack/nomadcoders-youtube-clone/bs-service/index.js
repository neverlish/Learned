const express = require("express");
const bodyParser = require("body-parser");
const { prisma } = require("./generated/prisma-client");

const app = express();

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const posts = await prisma.posts();
  res.json(posts);
});

app.get("/comments", async (req, res) => {
  const comments = await prisma.comments();
  res.json(comments);
});

app.post("/add-comment", async (req, res) => {
  const {
    body: { comment }
  } = req;
  await prisma.createComment({
    comment
  });
  res.redirect("/comments");
});

app.get("/post/:id", async (req, res) => {
  const {
    params: { id }
  } = req;
  const post = await prisma.post({ id });
  res.json(post);
});

app.listen(3000);
