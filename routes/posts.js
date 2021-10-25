const express = require("express");
const router = express.Router();

const Post = require("../models/PostModel");

// Get all posts
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

// Get a single post
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ nopostfound: "No post found" }));
});

// Create a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// update post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.remove({ _id: req.params.id });
    res.json(deletedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
