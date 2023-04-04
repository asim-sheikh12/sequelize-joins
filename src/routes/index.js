const { commentRouter } = require("./comments.routes");
const { postRouter } = require("./post.routes");
const { userRouter } = require("./user.routes");

const restRouter = require("express").Router();

restRouter.use(userRouter);
restRouter.use(postRouter);
restRouter.use(commentRouter);

module.exports = { restRouter };
