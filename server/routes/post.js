import express from "express";
import Post from "../models/Post";
import { error } from "console";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: 1 });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({
      title,
      content,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (e) {
    console.error("Error creating post:", e);
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (e) {
    console.error("Error updating post:", e);
    res.status(500).json({ error: "Failed to update post" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).end();
  } catch (e) {
    console.error("Error deleting post:", e);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;
