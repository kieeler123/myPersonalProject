import express from "express";
import { TextModel } from "../models/TextModel.js";

const router = express.Router();

export default function createTextRoutes(db) {
  const model = new TextModel(db);

  // GET /api/texts
  router.get("/", async (req, res) => {
    try {
      const items = await model.getAll();
      res.json(items);
    } catch {
      res.status(500).json({ error: "조회 실패" });
    }
  });

  // POST /api/texts
  router.post("/", async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "text 필드가 필요합니다" });

    try {
      const result = await model.create(text);
      res.status(201).json(result);
    } catch {
      res.status(500).json({ error: "저장 실패" });
    }
  });

  // DELETE /api/texts/:id
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await model.deleteById(id);
      res.json({ success: result.deletedCount > 0 });
    } catch {
      res.status(500).json({ error: "삭제 실패" });
    }
  });

  return router;
}
