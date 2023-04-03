const db = require("../../database/models");

const user = db.User;
exports.addUser = async (req, res) => {
  try {
    const { email } = req.body;
    const isUser = await user.findOne({ where: { email } });
    if (isUser) {
      res.status(403).json({ message: "User already exists" });
    } else {
      const data = await user.create(req.body);
      res.status(200).json({ message: "User created successfully", data });
    }
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.getAllUser = async (_req, res) => {
  try {
    const data = await user.findAll({
      attributes: ["id", "name", "email"],
      include: [
        { model: db.Post, attributes: ["title", "content"], as: "posts" },
      ],
    });
    res.status(200).json({ message: "Users fetched successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await user.findOne({ where: { id } });
    res.status(200).json({ message: "User fetched successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await user.destroy({ where: { id } });
    res.status(200).json({ message: "User deleted successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const isUser = await user.findOne({ where: { id } });
    if (!isUser) {
      res.status(404).json({ message: "User not found!" });
    } else {
      const data = await user.update(
        { name, email },
        { where: { id }, returning: true }
      );
      res
        .status(200)
        .json({ message: "User updated successfully", data: data[1] });
    }
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
