import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config.js";
import { upload } from "./middleware/upload.js";
import videosRouter, { bindGridFSBucket } from "./routes/videos.js";

import multer from "multer";

const app = express();

// ...라우트들 아래에 추가
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ error: "파일이 너무 큽니다" });
    }
    return res.status(400).json({ error: `업로드 오류: ${err.code}` });
  }
  next(err);
});

app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "server error" });
});

app.use(cors({ origin: config.clientOrigin }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 업로드 라우트에 multer 연결 (단일 파일 필드명: 'file')
app.use("/api/videos", videosRouter);

// 헬스체크
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// DB 연결 및 서버 시작
const start = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      dbName: config.dbName,
    });
    bindGridFSBucket(conn.connection);

    app.listen(config.port, () => {
      console.log(`Server listening on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error("DB connection failed:", e);
    process.exit(1);
  }
};

start();
