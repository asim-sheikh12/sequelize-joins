const {
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controller/user");

const userRouter = require("express").Router();

userRouter.post("/user", addUser);
userRouter.get("/user", getAllUser);
userRouter.get("/user/:id", getUserById);
userRouter.delete("/user/:id", deleteUser);
userRouter.patch("/user/:id", updateUser);

module.exports = {
  userRouter,
};
