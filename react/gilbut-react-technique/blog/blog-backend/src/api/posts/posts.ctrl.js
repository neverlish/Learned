const Post = require('models/post');

exports.write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    title, body, tags
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.read = async (ctx) => {
};

exports.remove = async (ctx) => {
};

exports.replace = async (ctx) => {
};

exports.update = async (ctx) => {
};
