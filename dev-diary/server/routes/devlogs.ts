import express from "express";
import DevLog from "../models/DevLog";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const log = await DevLog.create({ title, content });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: "일지 생성 실패" });
  }
});

// READ ALL
router.get("/", async (_req, res) => {
  const logs = await DevLog.find().sort({ createdAt: -1 });
  res.json(logs);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const log = await DevLog.findById(req.params.id);
  res.json(log);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const log = await DevLog.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  res.json(log);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await DevLog.findByIdAndDelete(req.params.id);
  res.json({ message: "삭제 완료" });
});

export default router;
