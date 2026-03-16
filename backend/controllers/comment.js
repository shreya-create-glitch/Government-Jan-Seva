

const commentSchema = require("../model/comment");

const comment = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  try {
    const newComment = await commentSchema.create({
      text,
      user: req.user.userId,
      complaint: id,
    });

    res.status(200).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    res.status(500).json({
      message: "Error adding comment",
      error: error.message,
    });
  }
};

const getcomment = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await commentSchema
      .find({ complaint: id }) 
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching comments",
      error: error.message,
    });
  }
};

module.exports = { comment, getcomment };
