const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const updated = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json(updated);
  } catch (e) {
    res.status(500).json({ error: "수정 실패" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: "삭제 실패" });
  }
});


// 글 생성
router.post("/", async (req, res) => {
  console.log("✅ 글 생성 요청 도착");
  const { title, content } = req.body;

  try {
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (e) {
    console.error("❌ DB 저장 실패:", e.message);
    res.status(500).json({ error: "글 저장 실패" });
  }
});

// ✅ 글 목록 조회 (GET /api/posts)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: "글 목록 불러오기 실패" });
  }
});

module.exports = router;
