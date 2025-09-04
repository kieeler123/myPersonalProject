import multer from "multer";
import { config } from "../config.js";

// 메모리 저장 후 GridFS로 스트리밍 전송
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: config.maxFileSizeBytes },
});
