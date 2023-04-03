const {
  addPost,
  getAllPost,
  getPostById,
  deletePost,
  updatePost,
} = require("../controller/post");

const postRouter = require("express").Router();

postRouter.post("/post", addPost);
postRouter.get("/post", getAllPost);
postRouter.get("/post/:id", getPostById);
postRouter.delete("/post/:id", deletePost);
postRouter.patch("/post/:id", updatePost);

module.exports = {
  postRouter,
};
