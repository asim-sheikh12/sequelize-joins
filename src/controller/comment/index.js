const db = require("../../database/models");

const comments = db.Comment;
const user = db.User;
exports.addComment = async (req, res) => {
  try {
    const { postId, comment, userId } = req.body;
    const isComment = await user.findOne({
      where: { id: userId },
      include: [
        {
          model: comments,
          as: "comments",
          attributes: ["comment"],
          where: { comment },
        },
      ],
    });
    if (isComment) {
      res.status(403).json({ message: "This comment already exists" });
    } else {
      const data = await comments.create({ postId, comment, userId });
      res.status(200).json({ message: "Comment created successfully", data });
    }
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.getAllComment = async (_req, res) => {
  try {
    const data = await comments.findAll({
      attributes: ["comment"],
      include: [
        {
          model: db.User,
          attributes: ["id", "name", "email"],
          as: "author",
        },
        {
          model: db.Post,
          attributes: ["title", "content"],
          as: "post",
        },
      ],
    });
    res.status(200).json({ message: "Comments fetched successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await comments.findOne({
      where: { id },
      attributes: ["id", "comment"],
      include: [
        {
          model: db.User,
          attributes: ["id", "name", "email"],
          as: "author",
        },
      ],
    });
    res.status(200).json({ message: "Comment fetched successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await comments.destroy({ where: { id } });
    res.status(200).json({ message: "Comment deleted successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const isComment = await comments.findOne({ where: { id } });
    if (!isComment) {
      res.status(404).json({ message: "Comment not found!" });
    } else {
      const data = await comments.update(
        { comment },
        {
          where: { id },
          attributes: ["id", "comment"],
          returning: true,
        }
      );
      res
        .status(200)
        .json({ message: "Comment updated successfully", data: data[1] });
    }
  } catch (error) {
    console.log(error);
    res
      .status(504)
      .json({ message: "Something went wrong, please try again later!" });
  }
};
