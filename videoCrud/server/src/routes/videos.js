// server/src/routes/videos.js
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import Video from "../models/Video.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// ---- GridFS Bucket 바인딩 ----
let bucket = null;
/**
 * index.js에서 Mongo 연결 직후 호출:
 *   bindGridFSBucket(conn.connection)
 */
export const bindGridFSBucket = (conn) => {
  bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "videos" });
  // 콘솔 확인용(원하면 주석 해제)
  // console.log('[GridFS] bucket ready:', bucket.s.options.bucketName);
};

// ---- 업로드: 파일 + 메타데이터 ----
// POST /api/videos
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!bucket) return res.status(500).json({ error: "storage not ready" });

    // 1) 입력 검증
    if (!req.file) return res.status(400).json({ error: "file is required" });
    const { title = "", description = "" } = req.body;
    if (!title.trim())
      return res.status(400).json({ error: "title is required" });

    // 2) GridFS 업로드 시작
    const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
      metadata: { originalName: req.file.originalname },
    });

    // 메모리 저장된 파일 버퍼 전송
    uploadStream.end(req.file.buffer);

    uploadStream.on("error", (err) => next(err));

    // 3) 완료 후 files 컬렉션에서 문서를 직접 조회
    uploadStream.on("finish", async () => {
      try {
        const gf = await bucket.find({ _id: uploadStream.id }).next();
        if (!gf)
          return res.status(500).json({ error: "stored file not found" });

        const doc = await Video.create({
          title: title.trim(),
          description: description.trim(),
          filename: gf.filename,
          fileId: gf._id,
          contentType: gf.contentType || req.file.mimetype, // 일부 드라이버/버전에서 contentType이 비어 있을 수 있음
          length: gf.length,
        });

        return res.status(201).json(doc);
      } catch (e) {
        return next(e);
      }
    });
  } catch (err) {
    next(err);
  }
});

// ---- 목록 조회: 검색/정렬/페이지 ----
// GET /api/videos
router.get("/", async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    const sortField = ["createdAt", "title"].includes(req.query.sort)
      ? req.query.sort
      : "createdAt";
    const sort = sortField === "title" ? { title: 1 } : { createdAt: -1 };
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(parseInt(req.query.limit || "20", 10), 100);
    const skip = (page - 1) * limit;

    const query = q ? { $text: { $search: q } } : {};
    const [items, total] = await Promise.all([
      Video.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Video.countDocuments(query),
    ]);

    res.json({ items, page, limit, total });
  } catch (err) {
    next(err);
  }
});

// ---- 단건 조회 ----
// GET /api/videos/:id
router.get("/:id", async (req, res, next) => {
  try {
    const doc = await Video.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: "not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// ---- 수정(제목/설명) ----
// PUT /api/videos/:id
router.put("/:id", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const doc = await Video.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "not found" });

    if (typeof title === "string" && title.trim()) doc.title = title.trim();
    if (typeof description === "string") doc.description = description.trim();
    await doc.save();

    res.json({ updated: true });
  } catch (err) {
    next(err);
  }
});

// ---- 삭제(메타 + GridFS 파일) ----
// DELETE /api/videos/:id
router.delete("/:id", async (req, res, next) => {
  try {
    if (!bucket) return res.status(500).json({ error: "storage not ready" });

    const doc = await Video.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "not found" });

    try {
      await bucket.delete(doc.fileId);
    } catch (_e) {
      // 파일이 이미 없을 수도 있음: 무시
    }
    await doc.deleteOne();

    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
});

// ---- 스트리밍(HTTP Range 지원) ----
// GET /api/videos/:id/stream
router.get("/:id/stream", async (req, res, next) => {
  try {
    if (!bucket) return res.status(500).json({ error: "storage not ready" });

    const doc = await Video.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "not found" });

    const file = await bucket.find({ _id: doc.fileId }).next();
    if (!file) return res.status(404).json({ error: "file not found" });

    const range = req.headers.range;
    const total = file.length;

    if (range) {
      const parts = String(range)
        .replace(/bytes=/, "")
        .split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;

      if (Number.isNaN(start) || start >= total || end >= total) {
        res
          .status(416)
          .set({ "Content-Range": `bytes */${total}` })
          .end();
        return;
      }

      res.status(206).set({
        "Content-Range": `bytes ${start}-${end}/${total}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": file.contentType || "application/octet-stream",
      });

      bucket.openDownloadStream(doc.fileId, { start, end: end + 1 }).pipe(res);
    } else {
      res.status(200).set({
        "Content-Length": total,
        "Accept-Ranges": "bytes",
        "Content-Type": file.contentType || "application/octet-stream",
      });
      bucket.openDownloadStream(doc.fileId).pipe(res);
    }
  } catch (err) {
    next(err);
  }
});

// ---- 다운로드 ----
// GET /api/videos/:id/download
router.get("/:id/download", async (req, res, next) => {
  try {
    if (!bucket) return res.status(500).json({ error: "storage not ready" });

    const doc = await Video.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "not found" });

    const file = await bucket.find({ _id: doc.fileId }).next();
    if (!file) return res.status(404).json({ error: "file not found" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.filename}.mp4"`
    );
    res.setHeader(
      "Content-Type",
      file.contentType || "application/octet-stream"
    );
    bucket.openDownloadStream(doc.fileId).pipe(res);
  } catch (err) {
    next(err);
  }
});

// ---- 에러 핸들링(라우터 레벨) ----
router.use((err, req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ error: "파일이 너무 큽니다" });
    }
    return res.status(400).json({ error: `업로드 오류: ${err.code}` });
  }
  console.error("[videos router] error:", err);
  res.status(500).json({ error: "server error" });
});

export default router;
