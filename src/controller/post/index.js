const db = require("../../database/models");

const post = db.Post;
exports.addPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const isPost = await post.findOne({ where: { title } });
    if (isPost) {
      res.status(403).json({ message: "Post already exists" });
    } else {
      const data = await post.create({ title, content, userId });
      res.status(200).json({ message: "Post created successfully", data });
    }
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.getAllPost = async (_req, res) => {
  try {
    const data = await post.findAll({
      attributes: ["id", "title", "content"],
      include: [
        {
          model: db.User,
          attributes: ["id", "name", "email"],
          as: "author",
        },
      ],
    });
    res.status(200).json({ message: "Posts fetched successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await post.findOne({
      where: { id },
      attributes: ["id", "title", "content"],
      include: [
        {
          model: db.User,
          attributes: ["id", "name", "email"],
          as: "author",
        },
      ],
    });
    res.status(200).json({ message: "Post fetched successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await post.destroy({ where: { id } });
    res.status(200).json({ message: "Post deleted successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const isPost = await post.findOne({ where: { id } });
    if (!isPost) {
      res.status(404).json({ message: "Post not found!" });
    } else {
      const data = await post.update(
        { title, content },
        {
          where: { id },
          attributes: ["id", "title", "content"],
          returning: true,
        }
      );
      res
        .status(200)
        .json({ message: "Post updated successfully", data: data[1] });
    }
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
