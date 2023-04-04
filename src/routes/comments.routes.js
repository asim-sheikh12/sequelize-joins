const {
  addComment,
  getAllComment,
  getCommentById,
  deleteComment,
  updateComment,
} = require("../controller/comment");

const commentRouter = require("express").Router();

commentRouter.post("/comment", addComment);
commentRouter.get("/comment", getAllComment);
commentRouter.get("/comment/:id", getCommentById);
commentRouter.delete("/comment/:id", deleteComment);
commentRouter.patch("/comment/:id", updateComment);

module.exports = {
  commentRouter,
};
