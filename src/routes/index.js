const { postRouter } = require("./post.routes");
const { userRouter } = require("./user.routes");

const restRouter = require("express").Router();

restRouter.use(userRouter);
restRouter.use(postRouter);

module.exports = { restRouter };
