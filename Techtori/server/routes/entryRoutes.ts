import express from "express";
import {
  getEntries,
  createEntry,
  deleteEntry,
} from "../controllers/entryController";
const router = express.Router();
router.get("/", getEntries);
router.post("/", createEntry);
router.delete("/:id", deleteEntry);
export default router;
